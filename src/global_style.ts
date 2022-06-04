import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html,body{
  background: RGB(15,20,41,1);
  font-family: 'Source Code Pro';
  color: #E3E4FF;
  font-size: 13px;
  font-weight: 400;
}
input[type=number]::-webkit-inner-spin-button {
  opacity: 0;
}
input[type=number]:hover::-webkit-inner-spin-button,
input[type=number]:focus::-webkit-inner-spin-button {
  opacity: 0.25;
}
/* width */
::-webkit-scrollbar {
  background-color: transparent;
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #212226;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background-color: #38394A;
  border-radius: 0px;
  border: 2px solid #25262b;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #414358;
}

.rc-virtual-list-scrollbar {
  width: 8px;
  border-radius: 0px;
}
.rc-virtual-list-scrollbar-track {
  background: #212226;
}
.rc-virtual-list-scrollbar-thumb {
  background-color: #38394A;
  border-radius: 0;
  border: 4px solid #38394A;
}

.ant-slider-track, .ant-slider:hover .ant-slider-track {
  background-color: #72d4b9;
  opacity: 0.75;
}
.ant-slider-track,
.ant-slider ant-slider-track:hover {
  background-color: #ffffff;
  opacity: 0.75;
}
.ant-slider-dot-active,
.ant-slider-handle,
.ant-slider-handle-click-focused,
.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open)  {
  border: 2px solid #72d4b9; 
}
.ant-table-tbody > tr.ant-table-row:hover > td {
  background: #273043;
}
.ant-table-tbody > tr > td {
  border-bottom: 8px solid #25262b;
}
.ant-table-container table > thead > tr:first-child th {
  border-bottom: none;
}
.ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text::after {
  border-top: 1px solid #434a59 !important;
}
.ant-layout {
    background: #25262b
  }
  .ant-table {
    background: #212734;
  }
  .ant-table-thead > tr > th {
    background: #25262b;
  }
.ant-select-item-option-content {
  img {
    margin-right: 4px;
  }
}
.ant-select {
  color: #E3E4FF;
  font-weight: 600;
  background: #2a2b32;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 48%), 0 6px 16px 0 rgb(0 0 0 / 32%), 0 9px 28px 8px rgb(0 0 0 / 20%);
}
.ant-select-arrow {
  color: #72d4b9;
}
.ant-select-item ant-select-item-option {
  background-color: #25262B;
}
.ant-select-item-option-active:not(.ant-select-item-option-disabled) {
  background-color: #25262b;
  color: #E3E4FF;
}
.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
  background-color: #25262B;
  color: #72d4b9;
}
.ant-select-item {
  transition: none;
  color: #a5adc7;
  font-weight: 600;
}
.ant-dropdown-button {
  color: #E3E4FF;
  font-weight: 600;
  background: #2a2b32;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 48%), 0 6px 16px 0 rgb(0 0 0 / 32%), 0 9px 28px 8px rgb(0 0 0 / 20%);
  border: 0;
}
.ant-btn {
  border: #32343c solid 1px;
  border-radius: 0;
}
.ant-btn-group > .ant-btn:hover {
  border: solid 1px;
  background-image: linear-gradient(90deg, #6a7578 0%, #70687d 30%, #4c5872 100%);
  border-image:	linear-gradient(90deg, #d3eaed 0%, #e2cdf7 30%, #86a2db 100%) 1;
  color: #E3E4FF;
  /*background: #32343c;*/
}
.ant-btn-group > .ant-btn {
  font-size: 13px;
  font-weight: 600;
  color: #E3E4FF;
}
.ant-btn-primary {
  background: #32343c;
  border: #32343c solid 1px;
  color: #E3E4FF;
}
.ant-btn-primary:hover {
  background-image: linear-gradient(90deg, #6a7578 0%, #70687d 30%, #4c5872 100%);
  border-image: linear-gradient(90deg, #d3eaed 0%, #e2cdf7 30%, #86a2db 100%) 1;
  color: #E3E4FF;
}
.ant-btn-ghost {
  color: #828aa1;
  border: #32343c solid 1px;
}
.ant-switch {
  background: #454956;
}
.ant-switch-checked {
  background: #72d4b9;
}
.ant-dropdown-menu-title-content {
  font-size: 13px;
  color: #a5adc7;
  padding: 0px 12px;
}
.ant-menu-horizontal {
  border-bottom: 0;
  margin-top: -2px;
  color: #a5adc7;
  font-weight: 600;
}
.ant-menu-horizontal > .ant-menu-item a {
  color: #a5adc7;
  font-size: 13px;
  line-height: 10px;
}
.ant-menu-title-content {
  color: #a5adc7;
  font-size: 13px;
}
.ant-menu-horizontal > .ant-menu-item a:hover {
  color: #E3E4FF;
}
.ant-menu-item a {
  color: #a5adc7;
}
.ant-menu-item a:hover {
  color: #E3E4FF;
}
.ant-modal-body {
  background-color: #25262b;
}
.ant-modal-footer {
  background-color: #25262b;
}
.ant-modal-content {
  background-color: #212734;
}
.ant-select-item-option-content {
  line-height: 36px;
}
.ant-select-selection-item {
  line-height: 36px;
}
.ant-input-affix-wrapper > input.ant-input {
  font-weight: 600;
  color: #E3E4FF;
}

.chart-markup-table price-axis-container {
  font-size: 24px;
}

@-webkit-keyframes highlight {
  from { background-color: #72d4b9;}
  to {background-color: #25262b;}
}
@-moz-keyframes highlight {
  from { background-color: #72d4b9;}
  to {background-color: #25262b;}
}
@-keyframes highlight {
  from { background-color: #72d4b9;}
  to {background-color: #25262b;}
}
.flash {
  -moz-animation: highlight 0.5s ease 0s 1 alternate ;
  -webkit-animation: highlight 0.5s ease 0s 1 alternate;
  animation: highlight 0.5s ease 0s 1 alternate;
}`;
