var toggle = true; //Esta a 100% el width del mapa
function efectoToggle()
{
	if(toggle){
		$('#map-container').css('width','66%');
		$('#control-panel fieldset').css('display','block');
		$('#dimensionar').html('&lt; - Click Me - &gt;');
		toggle = false;
	}else{
		$('#control-panel fieldset').css('display','none');
		$('#map-container').css('width','100%');
		$('#dimensionar').html('&gt; - Click Me - &lt;');
		toggle = true;
	}
}