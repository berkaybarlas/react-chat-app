import React, { Component } from 'react';
import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
import FAMenu from 'react-icons/lib/fa/list-ul'
import FASearch from 'react-icons/lib/fa/search'
import MdEject from 'react-icons/lib/md/power-settings-new'
import { SideBarOption } from './SideBarOption'
import {get, last , differenceBy} from 'lodash'
import {createChatNameFromUsers} from '../../Factories'
export default class SideBar extends Component{
	constructor(props) {
		super(props);
		this.state = {
			reciever:""
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const {reciever} = this.state
		const {onSendPrivateMessage} = this.props 

		onSendPrivateMessage(reciever)
	}
	render(){
		const { chats, activeChat, user, setActiveChat, logout,users} = this.props
		const {reciever} = this.state
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">Our Cool Chat <FAChevronDown /></div>
						<div className="menu">
							<FAMenu />
						</div>
					</div>
					<form onSubmit={this.handleSubmit} className="search">
						<i className="search-icon"><FASearch /></i>
						<input 
						placeholder="Search" 
						type="text"
						value = {reciever}
						onChange={(e)=>{ this.setState({reciever:e.target.value}) }}/>
						<div className="plus"></div>
					</form>
					<div 
						className="users" 
						ref='users' 
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						
						{
						chats.map((chat)=>{
							if(chat.name){
								const lastMessage = chat.messages[chat.messages.length - 1];
								const userName = chat.users.find((name)=>{
									return name !== user.name
								}) || "Community"
								const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
								
								return(
								<SideBarOption
								ket = {chat.id}
								name = {chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name) }
								lastMessage = { get(last(chat.messages),'message','') }
								active = {activeChat.id === chat.id}
								onClick = { ()=> {this.props.setActiveChat(chat)}}
								/>
							)
							}

							return null
						})	
						}
						{
							differenceBy(users,[user],'name').map((otherUser)=>{
								return(
									<SideBarOption 
									key={otherUser.id}
									name = {otherUser.name}
									onClick={()=>{ }}
									/>
								)
							})
						}
					</div>
					<div className="current-user">
						<span>{user.name}</span>
						<div onClick={()=>{logout()}} title="Logout" className="logout">
							<MdEject/>	
						</div>
					</div>
			</div>
		);
	
	}
}