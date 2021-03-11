import React, {useState, useEffect} from 'react';
import {Graph} from 'react-d3-graph';
import Grafo from '../../../Models/Grafo';

class MainPage extends React.Component {
	// graph payload (with minimalist structure)

	constructor(props) {
		super(props);
		this.graph = new Grafo();
		this.graph.addNode(1);
		this.graph.addNode(2);
		this.graph.addNode(3);
		this.graph.addNode(4);
		this.graph.addNode(5);
		this.graph.addNode(6);
		this.graph.addNode(7);
		this.graph.addNode(8);
		this.graph.addNode(9);
		this.graph.addNode(10);

		this.graph.addLink(1, 2);
		this.graph.addLink(1, 3);
		this.graph.addLink(2, 4);
		this.graph.addLink(2, 5);
		this.graph.addLink(3, 6);
		this.graph.addLink(3, 7);
		this.graph.addLink(4, 8);
		this.graph.addLink(5, 9);
		this.graph.addLink(8, 9);
		this.graph.addLink(9, 10);
		this.graph.addLink(6, 10);

		const nodesTemp = [];
		const linksTemp = [];

		for(var key in this.graph.adjacencyList) {
			if(this.graph.adjacencyList.hasOwnProperty(key)){
				nodesTemp.push({ id: key })
				this.graph.adjacencyList[key].forEach(child => {
					linksTemp.push({ source: `${key}`, target: `${child}` })
				})
			}
		}

		let data = {
			nodes: nodesTemp,
			links: linksTemp
		}

		this.state = {
			data: data
		}

	}

	changeColor = async function(nodeIds) {
		let modData = { ...this.state.data };
		let nodeId = nodeIds.shift()
		let selectNode = modData.nodes.filter(item => {
		  return item.id === `${nodeId}`;
		});
		selectNode.forEach(item => {
		  if (item.color && item.color === "red") item.color = "blue";
		  else item.color = "red";
		});
		await this.longTask()
		//testDelayedState(reactRef, modData)
		this.setState({ data: modData }, () => {
			this.changeColor(nodeIds)
		});
	};

	longTask = async () => {
		return new Promise((resolve) => {
		  setTimeout(() => {
			resolve();
		  }, 500);
		});
	}

	render() {

		// the graph configuration, just override the ones you need
		const myConfig = {
			nodeHighlightBehavior: true,
			directed: true,
			node: {
			color: "lightgreen",
			size: 120,
			highlightStrokeColor: "blue",
			},
			link: {
			highlightColor: "lightblue",
			},
		};
		
		const onClickNode = (nodeId) => {
			window.alert(`Clicked node ${nodeId}`);
		};
		
		const onClickLink = function(source, target) {
			window.alert(`Clicked link between ${source} and ${target}`);
		};
		
		const onClickDFS = () => {

			console.log("DFS")

			const path = this.graph.dfs(1);

			this.changeColor(path)
			
		}

		const onClickBFS = () => {
			console.log("DFS")

			const path = this.graph.bfs(1);

			this.changeColor(path)
		}

		return(
			<>
				<button onClick={onClickDFS}>DFS</button>
				<button onClick={onClickBFS}>BFS</button>
				<Graph
					id="graph-id" // id is mandatory
					data={this.state.data}
					config={myConfig}
					onClickNode={onClickNode}
					onClickLink={onClickLink}
				/>
			</>
		)
	}
}

export default MainPage;