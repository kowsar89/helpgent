import { useSelector } from "react-redux";
import Sidebar from "./overview/Sidebar.jsx";
import SettingContent from "./overview/SettingContent.jsx";
import { SetingBoxWrap } from './Style';

function SettingBox() {

    return (
        <SetingBoxWrap>
            <div className="wpwax-vm-seetings-box">
                <div className="wpwax-vm-seetings-box__header">
                    <div className="wpwax-vm-seetings-box__breadcrumb">
                        <ul>
                            <li><a href="#">Settings <span className="dashicons dashicons-arrow-right-alt2"></span></a></li>
                            <li><a href="#">General <span className="dashicons dashicons-arrow-right-alt2"></span></a></li>
                            <li><a href="#" className="wpwax-vm-active">General Settings</a></li>
                        </ul>
                    </div>
                    <div className="wpwax-vm-seetings-box__actions">
                        <div className="wpwax-vm-seetings-box-search">
                            <input type="text" name="wpwax-vm-settings-search" id="wpwax-vm-settings-search" placeholder="Search settings here..." />
                        </div>
                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary">Save Changes</a>
                    </div>
                </div>
                <div className="wpwax-vm-seetings-box__body">
                    <Sidebar />
                    <SettingContent />
                </div>
                <div className="wpwax-vm-seetings-box__footer">
                    <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary">Save Changes</a>
                </div>
            </div>
        </SetingBoxWrap>
    );
}

export default SettingBox;