class RGBASlider{
	constructor( parent, opts={},  ){
	const { backgroundClass,textClass,outputClass,outputTarget,presets} = opts;
		this.parent=parent;
		this.outputTarget=outputTarget; // can have 1 target or a class for multiples
		this.backgroundClass =`.${backgroundClass}` || null;
		this.textClass=`.${textClass}` || null;
		this.outputClass=`.${outputClass}`||null;
		this.colorVals = presets || [0,0,0,0];
		this.sliders=[];
	}

	init(){
		const calcRGBA=()=>{
			let nums = this.colorVals.slice(0,3)
				.concat(this.colorVals[3] / 100)
				.map(el => `${el}`)
				.join(',');
			return `rgba(${nums})`;
		}
		
		const updateColorsAndText=()=>{
			let rgba = calcRGBA();
			let nString = rgba.split(/[\)\(]/g)[1];
			
			if(this.backgroundClass){			
				document.querySelectorAll( this.backgroundClass )
					.forEach( elm => elm.style.backgroundColor=rgba );			
			}
			
			if(this.textClass){			
				document.querySelectorAll( this.textClass )
					.forEach( elm => elm.style.color=rgba );			
			}

			if(this.outputClass){			
				document.querySelectorAll( this.outputClass )
					.forEach( elm => elm.innerText=nString );			
			}
			
			if( this.outputTarget){
				this.outputTarget.innerText=nString;
			}
		}
		
		updateColorsAndText();
		
		
		const makeSlider=()=>{
			let index = this.sliders.length;
			let slider = document.createElement('input');
			slider.type ='range';
			slider.min=0;
			slider.max= index==3? 100 : 255;
			slider.value=this.colorVals[index];
			slider.addEventListener( 'input', ()=>{
				this.colorVals[index]= slider.value;
				updateColorsAndText();
			})
			this.sliders.push(slider);
			this.parent.appendChild(slider);
		}
	
		while(this.sliders.length < 4){
			makeSlider();
		}
	}
}