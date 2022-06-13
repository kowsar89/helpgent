import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ReactSVG } from 'react-svg';
import { VideoRecordWrap } from '../Style';
import permissionImg from '../../../../../../../../assets/img/chatbox/permission.png';
import play from '../../../../../../../../assets/svg/icons/play.svg'
import previewBg from "../../../../../../../../assets/img/builder/bg.png";

const Record = ()=>{
    const [state, setState] = useState({
        recordStage: "permission",
		startRecording: false
    });

	function updateRecordStage(stage){
		setState({
            ...state,
            recordStage: stage,
        });
	}
	function playRecording(){
		setState({
            ...state,
            startRecording: true
        });
	}
	function pauseRecording(stage){
		setState({
            ...state,
            recordStage: stage,
        });
	}
	
	const { recordStage, startRecording } = state;
	console.log(recordStage === "before-send");
		if(recordStage === "permission"){
			return(
				<VideoRecordWrap>
					<h4 className="wpwax-video-screen-title">To record video, your browser will need to request access to your camera & microphone.</h4>
					<img src={ permissionImg } alt="wpwax video support" />
					<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary" onClick={ ()=> updateRecordStage("staging") }>Request Permission</a>
				</VideoRecordWrap>
			);
		}else if(recordStage === "staging"){
			return(
				<VideoRecordWrap className="wpwax-vm-record-staging">
					<span className={startRecording ? "wpwax-vm-timer wpwax-vm-timer-start" : "wpwax-vm-timer"}>
						<span className="wpwax-vm-sec">00</span>
						<span className="wpwax-vm-seperator">:</span>
						<span className="wpwax-vm-min">00</span>
					</span>
					<div className="wpwax-vm-record-staging__bottom">
						{!startRecording? <p>Tap to <span className="wpwax-vm-highlighted">Start</span> recording!</p>:''}
						<div className={!startRecording? "wpwax-vm-record-staging__bottom--action": "wpwax-vm-record-staging__bottom--action wpwax-vm-record-start"}>
							<a href="#" className="wpwax-vm-record-btn" onClick={ ()=> playRecording() }></a>
							<a href="#" className="wpwax-vm-pause-btn" onClick={ ()=> pauseRecording('before-send') }></a>
							<a href="#" className="wpwax-vm-btn-close">x</a>
						</div>
					</div>
				</VideoRecordWrap>
			)
		}else if(recordStage === "before-send"){
			return(
				<VideoRecordWrap className="wpwax-vm-record-ready">
					<div className="wpwax-vm-record-ready__top">
						<div className="wpwax-vm-recorded-preview wpax-vm-preview-bg" style={{backgroundImage: `url("${ previewBg }")`}}></div>
						<a href="#" className="wpwax-vm-recorded-play"><ReactSVG src={ play } /></a>
					</div>
					<div className="wpwax-vm-record-ready__bottom">
						<h4>Ready to Send ?</h4>
						<div className="wpwax-vm-record-ready__bottom--actions">
							<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary">Yes</a>
							<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-light">No</a>
						</div>
					</div>
				</VideoRecordWrap>
			)
		}else if(recordStage === "progress"){
			
		}else if(recordStage === "success"){
			
		}	
}

export default Record;