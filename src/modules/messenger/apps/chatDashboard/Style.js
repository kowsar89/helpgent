import Styled from 'styled-components';

const ChatDashboardWrap = Styled.div`
    display: flex;
    padding-top: 40px;
    font-family: 'Inter', sans-serif;
    @media only screen and (max-width: 991px){
        flex-direction: column;
        align-items: center;
    }
    .wpwax-vm-sidebar{
        width: 340px;
        padding-left: 10px;
        @media only screen and (max-width: 991px){
            margin-bottom: 6px;
            padding-left: 0;
        }
    }
    .wpwax-vm-messagebox{
        flex: auto;
        margin: 0 40px 0 30px;
        border-radius: 20px;
        /* background-color: var(--color-white); */
        @media only screen and (max-width: 1199px){
            margin: 0 15px 0 15px;
        }
        @media only screen and (max-width: 767px){
            margin: 0 15px 0 5px;
        }
        .wpwax-vm-loder-active{
            &:after{
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 20px;
                background-color: var(--color-white)
            }
        }
        .wpwax-vm-loading-spin{
            top: -50%;
            left: 50%;
            z-index: 100;
        }
    }
    a{
        &:focus{
            outline: none;
            box-shadow: 0 0;
        }
    }
`;

export default ChatDashboardWrap;