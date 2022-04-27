import Styled from 'styled-components';

const TemplateBox = Styled.div`
    border-radius: 10px;
    padding: 20px;
    background-color: var(--color-white);
    .wpwax-vm-table{
        tr{
            th{
                &.wpwax-vm-head-name{
                    width: 80%;
                }
            }
        }
    }
    .wpwax-vm-titlebox{
        display: flex;
        align-items: center;
        .wpwax-vm-titlebox-inner{
            display: flex;
            align-items: center;
            min-width: 240px;
        }
        .wpwax-vm-titlebox__name{
            display: none;
            min-width: 240px;
            &.wpwax-vm-show{
                display: block;
            }
            span{
                display: block;
            }
        }
    }
    .wpwax-vm-titlebox__editor{
        display: none;
        &.wpwax-vm-show{
            display: flex;
        }
        
        
    }
    .wpwax-vm-titlebox__editor-action{
        margin-left: 10px;
        a{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0 5px 10px #adb4d260;
            margin: 2px;
            transition: 0.3s ease;
            text-decoration: none;
            &:focus{
                outline: none;
                box-shadow: 0 0;
            }
            &.wpwax-vm-titlebox__editor--cancel{
                background-color: var(--color-danger);
                display: none;
                &.wpwax-vm-show{
                    display: inline-flex;;
                }
            }
            &.wpwax-vm-titlebox__editor--yes{
                background-color: var(--color-success);
                display: none;
                &.wpwax-vm-show{
                    display: inline-flex;;
                }
            }
            &.wpwax-vm-titlebox__editor--edit{
                font-size: 15px;
                display: none;
                margin-left: 15px;
                &:before{
                    color: #2C99FF;
                }
                &.wpwax-vm-show{
                    display: inline-flex;
                }
            }
            .dashicons{
                line-height: 1;
                position: relative;
                top: -2px;
                &:before{
                    font-size: 15px;
                    color: var(--color-white);
                }
            }
        }
    }
`;

export {
    TemplateBox,
};