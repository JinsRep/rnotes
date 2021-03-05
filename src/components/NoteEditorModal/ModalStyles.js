import { createGlobalStyle } from "styled-components";
import { devices } from "../../constants/devices";

const ModalStyles = createGlobalStyle`

.ReactModal__Body--open{
    overflow:hidden;
    min-height:100%;
}
.rmodal{

    .ReactModal__Overlay{
        background-color:rgba(0,0,0,0.4)!important;
    }

    .ReactModal__Content{
        width:100%;
        left:0!important;
        top:60px!important;
        bottom:0!important;
        height:calc(100% - 60px);
        padding:0!important;
        position: relative;

        .content{
            height:calc(100% - 50px);
            overflow:auto;
            padding:10px;
        }

        .footer{
            position:absolute;
            left:0;
            bottom:0;
            width:100%;
            height:50px;
            background-color:#ddd;
            display:flex;
            align-items:center;
            justify-content:flex-end;
            padding:10px;

            button.primary{
                background-color:purple;
                color:#fff;
                border:1px solid purple;
                outline:none;
                padding:6px 10px 6px 10px;
                border-radius:4px;
                margin-right:6px;
            }

            button.secondary{
                background-color:#ccc;
                color:#000;
                border:1px solid #ccc;
                outline:none;
                padding:6px 10px 6px 10px;
                border-radius:4px;
                margin-right:6px;
            }
        }

        @media ${devices.large}{
            width:600px;
            top:65px!important;
            left:calc(50vw - 250px)!important;
            right:calc(50vw - 250px)!important;
            height:calc(100% - 70px);
        }
    }
}
`;

export default ModalStyles;
