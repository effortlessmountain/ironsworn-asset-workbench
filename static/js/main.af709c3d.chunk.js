(this["webpackJsonpironsworn-asset-workbench"]=this["webpackJsonpironsworn-asset-workbench"]||[]).push([[0],{14:function(e,t,a){e.exports=a(22)},15:function(e,t,a){},16:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);a(15),a(16);var n=a(1),r=a(2),s=a(4),i=a(3),l=a(5),o=a(0),c=a.n(o);var u=function(e,t){var a=new RegExp("".concat(e,"=(?:\"|')(.*?)(?:\"|')"));return(t.match(a)||[])[1]};function m(e){return{d:u("d",e),fill:u("fill",e),fillOpacity:u("opacity",e),viewBox:u("viewBox",e)}}function p(e){return c.a.createElement("div",{className:"text-input"},c.a.createElement("label",null,e.label),c.a.createElement("input",{type:"text",id:e.id,value:e.value,onChange:e.handleChange}))}function d(e){return c.a.createElement("div",{className:"text-input"},c.a.createElement("label",null,e.label),c.a.createElement("textarea",{className:e.className,value:e.value,onChange:e.handleChange}))}function h(e){return c.a.createElement("div",{className:"checkbox-input"},c.a.createElement("label",null,e.label),c.a.createElement("input",{type:"checkbox",className:e.className,checked:e.value,onChange:e.handleChange}))}function v(e){var t;return console.log("value is ",e.value),c.a.createElement("div",{className:"number-input"},c.a.createElement("label",null,e.label),c.a.createElement("input",{type:"number",id:e.id,value:+e.value||"",step:e.step,min:"0",max:100,onChange:(t=e.handleChange,function(e){var a=+e.currentTarget.value;a>100&&(a=100),t(a)})}))}function f(e){return c.a.createElement("div",{className:"ability-input"},c.a.createElement("div",{className:"ability-input-top"},c.a.createElement("div",{className:"ability-input-top-fields"},c.a.createElement(p,{label:"Name (optional)",id:"ability-name-input",value:e.ability.name||"",handleChange:function(t){e.ability.name=t.currentTarget.value,e.updateAbility(e.ability)}}),c.a.createElement(h,{label:"Filled",className:"ability-filled-input",value:e.ability.filled||!1,handleChange:function(t){e.ability.filled=!e.ability.filled,e.updateAbility(e.ability)}})),c.a.createElement("button",{className:"ability-button remove-ability",onClick:function(){return e.removeAbility(e.ability)}},"remove")),c.a.createElement(d,{label:"Ability Text",className:"ability-text-input",value:e.ability.text||"",handleChange:function(t){e.ability.text=t.currentTarget.value,e.updateAbility(e.ability)}}))}var y=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"updateAbility",value:function(e,t){this.props.currentAsset.abilities[t]=e,this.props.updateAsset(this.props.currentAsset)}},{key:"removeAbility",value:function(e){this.props.currentAsset.abilities.splice(e,1),this.props.updateAsset(this.props.currentAsset)}},{key:"addAbility",value:function(){this.props.currentAsset.abilities.push({filled:!1,name:"",text:""}),this.props.updateAsset(this.props.currentAsset)}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"editor-view"},c.a.createElement("div",{className:"vertical"},this.props.currentAsset.abilities.map((function(t,a){return c.a.createElement(f,{key:a,ability:t,updateAbility:function(t){return e.updateAbility(t,a)},removeAbility:function(){return e.removeAbility(a)}})})),c.a.createElement("button",{className:"ability-button",onClick:function(){return e.addAbility()}},"Add")))}}]),t}(c.a.Component),w=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"editor-view misc-editor-view"},c.a.createElement("div",{className:"horizontal"},c.a.createElement("div",{className:"vertical"},c.a.createElement(p,{label:"Asset Name",id:"asset-name-input",value:this.props.currentAsset.name,handleChange:function(t){e.props.currentAsset.name=t.currentTarget.value,e.props.updateAsset(e.props.currentAsset)}}),c.a.createElement(p,{label:"Type",id:"asset-type-input",value:this.props.currentAsset.type,handleChange:function(t){e.props.currentAsset.type=t.currentTarget.value,e.props.updateAsset(e.props.currentAsset)}}),c.a.createElement(p,{label:"Write-in (optional)",id:"asset-write-in-input",value:this.props.currentAsset.writeIn||"",handleChange:function(t){e.props.currentAsset.writeIn=t.currentTarget.value,e.props.updateAsset(e.props.currentAsset)}})),c.a.createElement("div",null,c.a.createElement("button",{onClick:this.props.askToDelete},"DELETE ASSET"))),c.a.createElement(d,{label:"Description (optional)",className:"asset-description-input",value:this.props.currentAsset.description,handleChange:function(t){e.props.currentAsset.description=t.currentTarget.value,e.props.updateAsset(e.props.currentAsset)}}),c.a.createElement("div",{className:"icon-import"},c.a.createElement("div",{className:"icon-import-helptext"},c.a.createElement("p",null,"SVG icons are supported. Use a transparent background for best results."),c.a.createElement("ol",null,c.a.createElement("li",null,"Head over to ",c.a.createElement("a",{href:"https://game-icons.net/",target:"_blank",rel:"noopener noreferrer"},"GameIcons.net"),", a wonderful resource of Creative Commons-licensed icons."),c.a.createElement("li",null,'On the left hand side, with "Studio" set to background, set "Type" to "none" (for a transparent background).'),c.a.createElement("li",null,"Download the icon."),c.a.createElement("li",null,'Click "browse..." under "Icon to import" below here and select the just-downloaded icon.'),c.a.createElement("li",null,'Fill in the artist\'s name and click "IMPORT".'))),c.a.createElement("div",{className:"icon-import-controls"},c.a.createElement("div",{className:"icon-import-fileselect"},c.a.createElement("label",{htmlFor:"icon-fileselect"},"Icon to import"),c.a.createElement("input",{type:"file",id:"icon-fileselect"})),c.a.createElement("div",{className:"icon-import-author"},c.a.createElement("label",{htmlFor:"icon-author"},"Icon Artist"),c.a.createElement("input",{type:"text",id:"icon-author",defaultValue:(this.props.currentAsset.icon||{}).author||""})),c.a.createElement("button",{id:"icon-import-button",onClick:function(){return e.props.handleIconImport()}}," Import "))))}}]),t}(c.a.Component),g=a(6);function b(e){return c.a.createElement("div",null,c.a.createElement("input",{type:"radio",id:"choose-track-".concat(e.value),value:e.value,checked:e.checked,onChange:e.onChange}),c.a.createElement("label",null,e.label))}var E=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(r.a)(t,[{key:"handleTrackTypeChange",value:function(e){"none"===e.currentTarget.value?(this.props.currentAsset.track=null,this.props.updateAsset(this.props.currentAsset)):"numerical"===e.currentTarget.value?(this.props.currentAsset.track=5,this.props.updateAsset(this.props.currentAsset)):"text"===e.currentTarget.value&&(this.props.currentAsset.track=["Value 1","Value 2"],this.props.updateAsset(this.props.currentAsset))}},{key:"handleNumericalTrackChange",value:function(e){var t=Object(g.cloneDeep)(this.props.currentAsset);t.track=+e,this.props.updateAsset(t)}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"editor-view"},c.a.createElement("label",null,"Type of Track"),c.a.createElement(b,{label:"No track",checked:null==this.props.currentAsset.track,onChange:function(t){return e.handleTrackTypeChange(t)},value:"none"}),c.a.createElement(b,{label:"Numerical",checked:"number"===typeof this.props.currentAsset.track,onChange:function(t){return e.handleTrackTypeChange(t)},value:"numerical"}),c.a.createElement(b,{label:"Text",checked:Array.isArray(this.props.currentAsset.track),onChange:function(t){return e.handleTrackTypeChange(t)},value:"text"}),"number"===typeof this.props.currentAsset.track&&c.a.createElement(v,{label:"Number of Values",value:this.props.currentAsset.track,step:"1",id:"track-number-input",handleChange:function(t){return e.handleNumericalTrackChange(t)}}),Array.isArray(this.props.currentAsset.track)&&c.a.createElement(d,{label:"Options (comma-delimited)",className:"track-options-input",value:this.props.currentAsset.track.join(", "),handleChange:function(t){var a=t.currentTarget.value.split(",").map((function(e){return e.trim()}));e.props.currentAsset.track=a,e.props.updateAsset(e.props.currentAsset)}}))}}]),t}(c.a.Component),k=a(8),A=a(13),S={assetTypeFontSize:"1.03em",assetTypeFont:"Simonetta",assetNameFontSize:"1.26em",assetNameFont:"Simonetta",detailsFontSize:"0.97em",detailsFont:"PT Serif",trackFontSize:"1.42em",trackFont:"Simonetta"},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},S);for(var a in t)t[a]=e[a]||t[a];return t},C=function(e){var t=N(e);function a(e){var t=e.split(":")[0].replace(/\+/g," ");return'"'.concat(t,'"')}return{googleFontUrl:function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var n=Array.from(new Set(t)).filter((function(e){return e})).map((function(e){return e.replace(/ /g,"+")})).map((function(e){return"family=".concat(e)})).join("&");return n?"https://fonts.googleapis.com/css2?".concat(n,"&display=swap"):""}(t.assetTypeFont,t.assetNameFont,t.detailsFont,t.trackFont),type:{fontFamily:a(t.assetTypeFont),fontSize:t.assetTypeFontSize},assetName:{fontFamily:a(t.assetNameFont),fontSize:t.assetNameFontSize},details:{fontFamily:a(t.detailsFont),fontSize:t.detailsFontSize},track:{fontFamily:a(t.trackFont),fontSize:t.trackFontSize}}};function F(e){return c.a.createElement("div",{className:"font-inputs"},c.a.createElement(p,{label:e.label+" font",id:"".concat(e.idPrefix,"-font-input"),value:e.font,handleChange:e.handleFontChange}),c.a.createElement(v,{label:e.label+" size",id:"".concat(e.idPrefix,"-size-input"),value:(t=e.size,+t.replace("em","")),step:"0.01",handleChange:e.handleSizeChange}));var t}function x(e){var t=N(e.currentAsset.fonts||{}),a=Object(o.useState)(t),n=Object(A.a)(a,2),r=n[0],s=n[1];function i(e){return function(t){var a=Object(k.a)({},r);e(a,t.currentTarget.value),s(a)}}function l(t){return function(a){var n=Object(k.a)({},r);t(n,a+"em"),s(n),e.currentAsset.fonts=n,e.updateAsset(e.currentAsset)}}return c.a.createElement("div",{className:"editor-view"},c.a.createElement("h3",null,"What fonts can I use?"),c.a.createElement("p",null,"The fonts from ",c.a.createElement("a",{href:"https://fonts.google.com/",target:"_blank",rel:"noopener noreferrer"},"Google Fonts"),' are supported. Put in the name of the font into the corresponding box here and you\'re all set! Font names are case-sensitive. If you want to use a Style other than the "Regular", click "Select This Style" on the Google Fonts Page, then click "Embed" on the sidebar that pops up on the right. Copy the part in bold ( such as ',c.a.createElement("b",null,"Red+Rose:wght@700")," ) and paste it in below."),c.a.createElement(F,{label:"Asset Type",idPrefix:"asset-type",font:r.assetTypeFont,size:r.assetTypeFontSize,handleFontChange:i((function(e,t){return e.assetTypeFont=t})),handleSizeChange:l((function(e,t){return e.assetTypeFontSize=t}))}),c.a.createElement(F,{label:"Asset Name",idPrefix:"asset-name",font:r.assetNameFont,size:r.assetNameFontSize,handleFontChange:i((function(e,t){return e.assetNameFont=t})),handleSizeChange:l((function(e,t){return e.assetNameFontSize=t}))}),c.a.createElement(F,{label:"Details",idPrefix:"details",font:r.detailsFont,size:r.detailsFontSize,handleFontChange:i((function(e,t){return e.detailsFont=t})),handleSizeChange:l((function(e,t){return e.detailsFontSize=t}))}),c.a.createElement(F,{label:"Track",idPrefix:"track",font:r.trackFont,size:r.trackFontSize,handleFontChange:i((function(e,t){return e.trackFont=t})),handleSizeChange:l((function(e,t){return e.trackFontSize=t}))}),c.a.createElement("button",{id:"fonts-update-button",onClick:function(t){e.currentAsset.fonts=r,e.updateAsset(e.currentAsset)}},"update fonts"),c.a.createElement("button",{onClick:function(){e.currentAsset.fonts=S,Object(g.assign)(r,S),e.updateAsset(e.currentAsset)}},"Reset to Default"))}function T(e){var t=e.view===e.activeView?"change-view selected":"change-view";return c.a.createElement("button",{id:"show-"+e.view+"-view",className:t,onClick:function(){return e.handleClick(e.view)}},e.children)}function z(e){return c.a.createElement("div",{className:"view-switcher"},c.a.createElement(T,{view:"top",activeView:e.activeView,handleClick:function(t){return e.switchView(t)}},"TOP"),c.a.createElement(T,{view:"abilities",activeView:e.activeView,handleClick:function(t){return e.switchView(t)}},"Abilities"),c.a.createElement(T,{view:"track",activeView:e.activeView,handleClick:function(t){return e.switchView(t)}},"Track"),c.a.createElement(T,{view:"fonts",activeView:e.activeView,handleClick:function(t){return e.switchView(t)}},"Fonts"),c.a.createElement(T,{view:"JSON",activeView:e.activeView,handleClick:function(t){return e.switchView(t)}},"JSON"),c.a.createElement(T,{view:"export",activeView:e.activeView,handleClick:function(t){return e.switchView(t)}},"export"))}var O=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={editorJSON:"",activeView:"top",errorText:""},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"switchView",value:function(e){this.setState({activeView:e})}},{key:"handleJSONChange",value:function(e){try{this.props.updateAsset(JSON.parse(e)),this.setState({editorJSON:"",errorText:""})}catch(t){this.setState({editorJSON:e,errorText:"Error parsing JSON: "+t.toString()})}}},{key:"resetEditorJson",value:function(){this.setState({editorJSON:"",errorText:""})}},{key:"handleIconImport",value:function(){var e=this,t=document.querySelector("#icon-fileselect"),a=document.querySelector("#icon-author"),n=t.files[0];if(n){var r=new FileReader;r.onload=function(t){var r=t.target.result;e.props.currentAsset.icon={type:"svg",name:n.name.split(".").slice(0,-1).join("."),author:a.value,svg:m(r)},e.props.updateAsset(e.props.currentAsset)},r.readAsText(n)}else alert("missing file")}},{key:"render",value:function(){var e,t=this;return c.a.createElement("div",{className:"editor"},c.a.createElement(z,{activeView:this.state.activeView,switchView:function(e){return t.switchView(e)}}),"top"===this.state.activeView&&c.a.createElement(w,{currentAsset:this.props.currentAsset,updateAsset:function(e){return t.props.updateAsset(e)},askToDelete:function(){return t.props.askToDelete()},handleIconImport:function(){return t.handleIconImport()}}),"abilities"===this.state.activeView&&c.a.createElement(y,{currentAsset:this.props.currentAsset,updateAsset:function(e){return t.props.updateAsset(e)}}),"track"===this.state.activeView&&c.a.createElement(E,{currentAsset:this.props.currentAsset,updateAsset:function(e){return t.props.updateAsset(e)}}),"fonts"===this.state.activeView&&c.a.createElement(x,{currentAsset:this.props.currentAsset,updateAsset:function(e){return t.props.updateAsset(e)}}),"JSON"===this.state.activeView&&c.a.createElement("div",{className:"editor-view"},c.a.createElement("div",null,c.a.createElement("textarea",{className:"interface-input thin-box-border",spellCheck:"false",value:this.state.editorJSON||(e=this.props.currentAsset,JSON.stringify(e,null,2)),onChange:function(e){return t.handleJSONChange(e.currentTarget.value)}})),c.a.createElement("div",{className:"json-error-container"},this.state.errorText&&c.a.createElement("div",{className:"json-error"},this.state.errorText,c.a.createElement("button",{onClick:function(){return t.resetEditorJson()}},"Reset to valid state")))),"export"===this.state.activeView&&c.a.createElement("div",{className:"editor-view"},c.a.createElement("div",{className:" export vertical"},c.a.createElement("p",null,"Use the buttons below to get your asset in PNG format. Preview will show you the generated image in the browser, while Download will bring up your browser's save dialog."),c.a.createElement("button",{id:"preview-download",onClick:function(){return t.props.previewAssetImage()}}," preview as image "),c.a.createElement("button",{id:"download",onClick:function(){return t.props.downloadAssetImage()}}," download as image "))))}}]),t}(c.a.Component);function I(e){return c.a.createElement("div",{className:"interface"},c.a.createElement(O,{currentAsset:e.currentAsset,updateAsset:e.updateAsset,askToDelete:e.askToDelete,previewAssetImage:e.previewAssetImage,downloadAssetImage:e.downloadAssetImage}),c.a.createElement("div",{className:"bottom-controls"},c.a.createElement("div",null,c.a.createElement("label",null,"Scale (also affects Download size)"),c.a.createElement("select",{id:"scale-select",onChange:function(t){return e.handleAssetScaleChange(t.target.value)},value:e.assetScale},c.a.createElement("option",{value:"one-third"},"250px by 350px"),c.a.createElement("option",{value:"one-half"},"375px by 525px"),c.a.createElement("option",{value:"two-thirds"},"500px by 700px"),c.a.createElement("option",{value:"full"},"750px by 1050px"))),c.a.createElement("button",{className:"asset-back-button",onClick:function(){return e.showScreen("choose")}},"Back")),c.a.createElement("div",null,c.a.createElement("p",{className:"credits"},"Ironsworn and the official Ironsworn assets Copyright \xa92019 Shawn Tomkin and used under the Creative Commons Attribution-NonCommercial- ShareAlike 4.0 International license."),c.a.createElement("p",{className:"credits"},"Have a suggestion or run into a bug? File an issue ",c.a.createElement("a",{href:"https://github.com/effortlessmountain/ironsworn-asset-workbench/issues"},"here on Github")," or contact EffortlessMountain on the Ironsworn discord server.")))}function V(e){return e.documentFormatVersion?2===e.documentFormatVersion?e:void 0:function(e){var t={documentFormatVersion:2,type:e.type,name:e.name,writeIn:e.writeIn,track:e.track,description:e.description,abilities:e.abilities};return"object"===typeof e.fonts&&(t.fonts={assetTypeFontSize:e.fonts.assetTypeFontSize,assetTypeFont:e.fonts.assetTypeFont,assetNameFontSize:e.fonts.assetNameFontSize,assetNameFont:e.fonts.assetNameFont,detailsFontSize:e.fonts.detailsFontSize,detailsFont:e.fonts.detailsFont,trackFontSize:e.fonts.trackFontSize,trackFont:e.fonts.trackFont}),"string"===typeof e.icon?t.icon=e.icon:"object"===typeof e.icon&&(t.icon={type:"svg",author:e.icon.author,name:e.icon.name,svg:m(e.icon.svg)}),t}(e)}var j={full:1,"two-thirds":2/3,"one-half":.5,"one-third":1/3};var L=a(7),D=a.n(L),J=a(11),M=a.n(J);var R=function(e){return e.writeIn?c.a.createElement("div",{className:"write-in"},e.writeIn):null},H=function(e){return e.description?c.a.createElement("div",{className:"description"},e.description):null},W=function(e){var t,a,n=(t=e.ability.text,M()(t,{allowedTags:["em","ul","li"],allowedAttributes:{}}));return c.a.createElement("div",{className:"ability"},c.a.createElement("i",{className:e.ability.filled?"dot filled":"dot unfilled"}),c.a.createElement("div",{className:"ability-description"},(a=e.ability.name)?c.a.createElement("span",{className:"ability-name"},a):"",c.a.createElement("span",{className:"ability-text",dangerouslySetInnerHTML:{__html:n}})))},P=function(e){return 0===e.value?c.a.createElement("div",{className:"value",key:"zed"},"0"):e.value<=e.track?c.a.createElement("div",{className:"value number"},"+",e.value):c.a.createElement("div",{className:"value empty"},c.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",preserveAspectRatio:"none",viewBox:"0 0 100 100",height:95*j[e.scale],width:113*j[e.scale]},c.a.createElement("line",{x1:"0",y1:"100",x2:"100",y2:"0",stroke:"rgb(65,64,66)",style:{strokeWidth:3.5}})))},G=function(e){if(e.track){var t=[];if(Array.isArray(e.track))t=e.track.map((function(e,t){return c.a.createElement("div",{className:"value text",key:t},e)}));else for(var a=Math.max(5,e.track),n=0;n<=a;n++)t.push(c.a.createElement(P,{track:e.track,value:n,scale:e.scale,key:n}));return c.a.createElement("div",{className:"track",style:e.style},t)}return null},B=function(e){return"string"===typeof e.icon?c.a.createElement("div",{className:"header-circle"},c.a.createElement("i",{className:"header-icon"},e.icon)):"object"===typeof e.icon?c.a.createElement("div",{className:"header-circle"},c.a.createElement("svg",{height:154*j[e.scale],width:154*j[e.scale],viewBox:"0 0 512 512"},c.a.createElement("g",null,c.a.createElement("path",{d:e.icon.svg.d,fill:e.icon.svg.fill,fillOpacity:e.icon.svg.fillOpacity})))):null},q=function(e){var t=e.asset,a=C(t.fonts);return c.a.createElement("div",{className:"asset ".concat(e.scale)},c.a.createElement("link",{rel:"stylesheet",href:a.googleFontUrl}),c.a.createElement("div",{className:"main-matter"},c.a.createElement("div",{className:"top"},c.a.createElement("div",{className:"type",style:a.type},t.type),c.a.createElement(B,{icon:t.icon,scale:e.scale}),c.a.createElement("div",{className:"asset-name",style:a.assetName},t.name)),c.a.createElement("div",{className:"details",style:a.details},c.a.createElement(R,{writeIn:t.writeIn}),c.a.createElement(H,{description:t.description}),c.a.createElement("div",{className:"abilities"},t.abilities.map((function(e,t){return c.a.createElement(W,{ability:e,key:t})}))))),c.a.createElement(G,{track:t.track,scale:e.scale,style:a.track}))},U=a(12),_=a.n(U),Y=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={canvas:null},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"saveImage",value:function(){var e=document.createElement("a");e.href=this.state.canvas.toDataURL(),e.download=this.props.asset.name+".png",document.body.appendChild(e),e.click(),document.body.removeChild(e)}},{key:"componentDidMount",value:function(){var e=this;if(!this.state.canvas){window.scrollTo(0,0);var t=document.querySelector(".render");_()(t.firstChild,{allowTaint:!0}).then((function(t){e.setState({canvas:t})}))}}},{key:"render",value:function(){var e=this;return this.state.canvas?this.props.preview?c.a.createElement("div",{className:"preview-download"},c.a.createElement("div",{className:"image-container"},c.a.createElement("img",{src:this.state.canvas.toDataURL(),alt:"".concat(this.props.asset.name," asset")})),c.a.createElement("div",{className:"preview-download-help"},c.a.createElement("p",null,"Right click and 'Save image as...' to save. If the image is truncated, try making your browser window bigger before pressing 'preview' or 'download as image'."),c.a.createElement("button",{id:"done-downloading",onClick:function(){return e.props.goBackToMain()}}," close "))):(this.saveImage(),this.props.goBackToMain(),null):c.a.createElement("div",{className:"render"},c.a.createElement(q,{asset:this.props.asset,scale:this.props.scale}))}}]),t}(c.a.Component);function K(e){var t=V(e.asset);return c.a.createElement("div",{className:"asset-choice",onClick:e.handleClick},c.a.createElement(q,{asset:t,scale:"one-third"}))}function Q(e){return c.a.createElement("div",{className:"horizontal"},c.a.createElement("div",{className:"asset-selection"},c.a.createElement("div",{className:"asset-selection-controls"},e.assets.map((function(t,a){return c.a.createElement(K,{asset:t,key:t.name+a,handleClick:function(){return e.chooseAsset(t,a)}})})))),c.a.createElement("div",{className:"vertical"},c.a.createElement("button",{onClick:e.showNewScreen},"ADD NEW ASSET")))}var X={fonts:{assetTypeFontSize:"1.03em",assetTypeFont:"Noto Sans JP",assetNameFontSize:"1.76em",assetNameFont:"Russo One",detailsFontSize:"0.97em",detailsFont:"Quicksand",trackFontSize:"1.12em",trackFont:"Krona One"},type:"combat talent",name:"Ironclad",writeIn:"",track:["LIGHTLY ARMORED","GEARED FOR WAR"],description:"If you wear high-tech armor...",abilities:[{filled:!0,text:"When you equip or adjust your armor, choose one. <li>Lightly armored: When you <em>Endure Harm</em> in a fight, add +1 and take +1 momentum on a hit.</li> <li>Geared for war: Mark encumbered. When you <em>Endure Harm</em> in a fight, add +2 and take +1 momentum on a hit.</li>"},{filled:!1,text:"When you <em>Clash</em> while you are geared for war, add +1."},{filled:!1,text:"When you <em>Compel</em> in a situation where strength of arms is a factor, add +2."}],icon:{type:"svg",author:"Delapouite",name:"Light Helm icon",svg:'<svg style="height: 512px; width: 512px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" style="touch-action: none;" transform="translate(0,0)"><path d="M246.488 29.5l-13.244 39.725 14.381 86.275h16.75l14.38-86.275L265.515 29.5h-19.026zM195 61.5l-40 30h63.709l-3.953-23.725 2.092-6.275H195zm100.152 0l2.092 6.275-3.953 23.725H357l-40-30h-21.848zM69.42 90.727L41.639 257.41 71 286.773V162.375l20.863-41.725L69.42 90.727zm373.16 0l-22.443 29.923L441 162.375v124.398l29.361-29.363-27.78-166.683zM117.563 109.5L89 166.625V400l110 82.5v-87.906l-80-32V211.576l35.393-72.076h72.316l-5-30H117.562zm172.728 0l-5 30h72.272L393 210.375v152.219l-80 32V482.5L423 400V166.625L394.437 109.5H290.291zm-124.684 48L137 215.758v3.742h238v-4.875L346.437 157.5h-64.146l-2.666 16h-47.25l-2.666-16h-64.102zM137 237.5v46h30v-46h-30zm96 0v46h46v-46h-46zm112 0v46h30v-46h-30zm-208 64v48.906l46.678 18.67 27.029-67.576H137zm93.092 0l-29.705 74.262L217 382.406v51.067l39 9.75 39-9.75v-51.067l16.613-6.644-29.705-74.262h-51.816zm71.201 0l27.03 67.576L375 350.406V301.5h-73.707z" fill="#fff" fill-opacity="1"></path></g></svg>'}},Z={fonts:{assetTypeFontSize:"1.03em",assetNameFontSize:"1.26em",detailsFontSize:"0.97em",trackFontSize:"1.42em"},type:"ritual",name:"Lightbearer",track:6,abilities:[{filled:!0,text:"When you focus on a source of light and capture its essence, roll +wits. On a strong hit, set your light track to +6. On a weak hit, make it +3. Then, when you make a move to overcome or navigate darkness, you may add +2 and suffer -1 light."},{text:"You may use your light to <em>Strike</em> or <em>Clash</em> against a dark-dwelling foe. Choose the amount of light to unleash, and roll +light (instead of +iron or +edge). Suffer -light equal to that amount. On a hit, your harm is 1+your unleashed light."},{text:"When you perform this ritual, add +1 and take +1 momentum on a hit."}],icon:{type:"svg",author:"Lorc",name:"Explosion Rays icon",svg:'<svg class="Icon" style="height: 512px; width: 512px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" style="touch-action: none;" transform="translate(0,0)"><path d="M54.184 19.512l116.02 144.838c-11.806 9.74-21.4 22.066-27.923 36.095L20.493 142.73v62.993l113.983 19.172c-1.12 6.056-1.707 12.295-1.707 18.67 0 3.502.177 6.965.52 10.378l-72.376 27.7 79.467.687c4.165 10.173 9.917 19.534 16.948 27.775L20.492 441.7v52.484h47.336l105.87-168.65c11.644 8.795 25.212 15.165 39.945 18.366l-23.7 150.284H294.22L253.25 344.69c8.668-1.524 16.964-4.14 24.744-7.7l37.262 42.268-21.326-51.365c6.885-4.792 13.16-10.402 18.68-16.692l182.533 146.61V348.556L329.43 284.865c4.29-9.722 7.118-20.227 8.195-31.238l84.7-25.93-86.78-7.008c-2.26-9.89-5.955-19.242-10.852-27.825l170.452-87.398V23.924L311.918 175.15c-5.33-5.95-11.342-11.28-17.912-15.86l15.533-38.382-29.968 29.967c-9.608-4.595-20.034-7.74-30.996-9.148L269.89 19.512h-40.12l1.27 121.478c-19.017.808-36.716 6.816-51.706 16.64L94.102 19.51H54.184z" fill="#fff" fill-opacity="1"></path></g></svg>'}},$={documentFormatVersion:2,type:"companion",name:"Cave Lion",writeIn:"Name",track:4,description:"Your cat takes down its prey.",abilities:[{filled:!1,name:"Eager",text:"When your cat chases down big game, you may <em>Resupply</em> with +edge (instead of +wits). If you do, take +1 supply or +1 momentum on a strong hit."},{filled:!1,name:"Inescapable",text:"When you <em>Enter the Fray</em> or <em>Strike</em> by sending your cat to attack, roll +edge. On a hit, take +2 momentum."},{filled:!1,name:"Protective",text:"When you <em>Make Camp</em>, your cat is alert to trouble. If you or an ally choose to relax, take +1 spirit. If you focus, take +1 momentum."}],icon:{type:"svg",author:"Delapouite",name:"Feline icon",svg:{d:"M110.056 64.815c-4.234.027-8.355.587-12.337 1.799C83.13 71.054 72.93 77.03 65.24 87.333c-7.691 10.303-13.122 25.717-15.516 49.713-.669 6.708 2.012 18.384 7.75 30.986 5.738 12.602 14.248 26.276 23.829 38.387l2.49 3.146-.678 3.955c-3.097 18.091-3.644 50.706-.252 68.778.836 4.454 5.766 14.497 13.611 26.296 7.846 11.8 18.412 25.829 30.032 40.944 23.239 30.23 50.678 64.773 69.81 96.547.024.038.347.525 2.139.886 1.791.362 4.605.28 7.127-.35 2.441-.609 4.524-1.766 5.338-2.458-9.946-42.286-16.14-84.185-37.51-125.14l-10.102-19.358 20.809 6.617c21.64 6.882 48.718 8.897 73.396 7.719 24.679-1.179 47.26-5.681 58.868-10.362l5.648-2.277 4.215 4.397c43.225 45.089 73.427 98.048 112.644 140.935.12.132-.139.16.91.088 1.05-.072 3-.714 4.706-1.914 1.705-1.2 3.106-2.882 3.722-4.234.617-1.353.659-2.086.268-3.149-20.396-55.487-30.565-109.894-61.84-162.258l-2.103-3.521 1.279-3.9c6.869-20.923 17.852-42.768 42.902-60.303l4.535-3.176 4.881 2.617c11.454 6.145 19.123 5.873 25.69 1.936 13.132-7.875 24.15-23.88 28.625-37.784l-14.768-8.31-.943-3.746c-4.025-15.96-8.255-25.48-14.625-32.719-6.37-7.24-15.576-12.896-30.977-19.543l-6.426-2.773 1.104-6.91c.89-5.57.052-11.481-1.184-17.768-36.228 29.915-52.892 64.4-86.533 100.086l-3.197 3.39-4.613-.652c-57.84-8.187-142.926-5.257-198.455 1.436-6.045.728-11.262-1.14-16.34-3.733-5.078-2.593-9.996-6.2-14.475-10.492-8.957-8.584-16.938-19.87-16.01-33.258.654-9.426 2.683-17.048 7.006-23.01 4.323-5.961 11.13-9.434 17.815-10.27 13.368-1.669 26.916 3.833 42.058 10.04 30.285 12.415 65.987 29.01 93.022 21.717 10.554-2.848 30.674-20.089 44.4-37.834 6.863-8.873 12.442-17.861 15.377-24.528 1.339-3.041 2.013-5.487 2.24-6.923-.507-.106-1.153-.163-2.355-.08-2.665.182-7.069 1.375-12.56 3.814-10.985 4.877-26.237 14.423-44.675 26.896-11.984 8.108-26.017 8.386-38.992 5.153-12.975-3.233-25.743-9.626-38.58-16.04-19.255-9.619-38.213-18.81-55.45-20.077a53.657 53.657 0 0 0-4.27-.147zm343.096 73.006l9.832 22.123-22.474-3.512 12.642-18.611zM75.28 308.858c-14.235 49.028-35.548 97.072-55.633 132.947-.014.026-.02.015-.03.028a.651.651 0 0 1 .122.207c.258.592 1.295 1.961 2.856 3.035 1.56 1.074 3.553 1.828 4.945 2.008 1.391.18 1.836-.11 1.84-.114 33.669-24.914 58.717-55.4 83.47-85.668l-.613-.794c-11.682-15.197-22.427-29.428-30.75-41.946-2.25-3.384-4.321-6.6-6.207-9.703zM19.615 441.833c-.108-.114-.099.11 0 0zm297.377-119.485c-7.129 2.366-15.533 4.408-24.863 6.022-12.418 40.091-33.327 77.867-52.203 112.605l-.141.26-.158.25c-.31.491-.252.186-.049.783s1.012 1.81 2.27 2.707c2.514 1.796 4.82 2.374 7.208.23l.047-.04.047-.041c32.285-28.17 59.254-61.458 85.242-102.867-5.621-6.799-11.396-13.455-17.4-19.909z",fill:"#fff",fillOpacity:"1",viewBox:"0 0 512 512"}}};function ee(e){return c.a.createElement("div",{className:"asset-choice",onClick:e.handleClick},c.a.createElement("div",{className:"add-new-asset asset one-third"},c.a.createElement("div",{className:"add-new-asset-text"},e.text)))}function te(e){return c.a.createElement("div",{className:"asset-selection"},c.a.createElement("h3",null,"Create a blank asset or copy an example:"),c.a.createElement("div",{className:"asset-selection-controls"},c.a.createElement(ee,{text:"Blank Asset",handleClick:function(){return e.createAsset(function(){return arguments.length>0&&void 0!==arguments[0]&&arguments[0],{documentFormatVersion:2,abilities:[],description:"",name:"",type:"",fonts:{},icon:"",track:null,writeIn:""}}())}}),[X,Z,$].map((function(t,a){return c.a.createElement(K,{key:a,asset:t,handleClick:function(){return e.createAsset(Object(g.cloneDeep)(t))}})}))),c.a.createElement("button",{onClick:e.showChooseScreen},"CANCEL"))}function ae(e,t){return e&&e.length>0?e[0]:t?{name:"Default Collection",assets:[V(t)]}:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Default Collection";return{name:e,assets:[]}}()}var ne=function(e){function t(e){var a;Object(n.a)(this,t);var r=ae((a=Object(s.a)(this,Object(i.a)(t).call(this,e))).maybeGetLocalCollections(),a.maybeGetLocalAsset()),l=window.innerHeight>1070?"full":window.innerHeight>750?"two-thirds":"one-half";return a.state={currentAsset:null,currentAssetIndex:null,currentCollection:r,assetScale:l,currentScreen:"choose",previewDownload:!0},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"maybeGetLocalCollections",value:function(){var e=window.localStorage.getItem("collections");if(e)try{return JSON.parse(e)}catch(t){window.alert("Error parsing local collections: "+t.toString())}return null}},{key:"maybeGetLocalAsset",value:function(){var e=window.localStorage.getItem("currentAsset");if(e)try{return JSON.parse(e)}catch(t){window.alert("Error parsing local asset: "+t.toString())}return null}},{key:"handleAssetScaleChange",value:function(e){this.setState({assetScale:e})}},{key:"persistCollection",value:function(e){window.localStorage.setItem("collections",JSON.stringify([e]))}},{key:"updateAsset",value:function(e){var t=this;this.setState((function(a){return a.currentCollection.assets[a.currentAssetIndex]=e,t.persistCollection(a.currentCollection),{currentAsset:V(e)}}))}},{key:"askToDelete",value:function(){var e=this;window.confirm("Delete this asset?")&&this.setState((function(t){return t.currentCollection.assets.splice(t.currentAssetIndex,1),e.persistCollection(t.currentCollection),{currentCollection:t.currentCollection,currentScreen:"choose"}}))}},{key:"createAsset",value:function(e){this.setState((function(t){var a=t.currentCollection.assets.push(e)-1;return window.localStorage.setItem("collections",JSON.stringify([t.currentCollection])),{currentAsset:V(e),currentAssetIndex:a,currentCollection:t.currentCollection,currentScreen:"edit"}}))}},{key:"chooseAsset",value:function(e,t){this.setState({currentAsset:V(e),currentAssetIndex:t,currentScreen:"edit"})}},{key:"showScreen",value:function(e){this.setState({currentScreen:e})}},{key:"previewAssetImage",value:function(){this.setState({currentScreen:"preview-download",previewDownload:!0})}},{key:"downloadAssetImage",value:function(){this.setState({currentScreen:"preview-download",previewDownload:!1})}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"app"},c.a.createElement("header",{className:"app-header"},c.a.createElement("h2",null,"Asset Workbench ",c.a.createElement("span",{className:"app-version"},"v0.10.0"))),"preview-download"===this.state.currentScreen&&c.a.createElement(Y,{asset:this.state.currentAsset,scale:this.state.assetScale,goBackToMain:function(){return e.showScreen("edit")},preview:this.state.previewDownload}),"choose"===this.state.currentScreen&&c.a.createElement(Q,{chooseAsset:function(t,a){return e.chooseAsset(t,a)},showNewScreen:function(){return e.showScreen("new")},assets:this.state.currentCollection.assets}),"new"===this.state.currentScreen&&c.a.createElement(te,{createAsset:function(t){return e.createAsset(t)},showChooseScreen:function(){return e.showScreen("choose")}}),"edit"===this.state.currentScreen&&c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"assets"},c.a.createElement(q,{asset:this.state.currentAsset,scale:this.state.assetScale})),c.a.createElement(I,{currentAsset:this.state.currentAsset,updateAsset:function(t){return e.updateAsset(t)},askToDelete:function(){return e.askToDelete()},assetScale:this.state.assetScale,handleAssetScaleChange:function(t){return e.handleAssetScaleChange(t)},showScreen:function(t){return e.showScreen(t)},previewAssetImage:function(){return e.previewAssetImage()},downloadAssetImage:function(){return e.downloadAssetImage()}})))}}]),t}(c.a.Component);D.a.render(c.a.createElement(ne,null),document.querySelector(".app-container"))}},[[14,1,2]]]);
//# sourceMappingURL=main.af709c3d.chunk.js.map