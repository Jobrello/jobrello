<script lang="ts">
import Upload from "./Upload.svelte"
import InformativeRange from "./InfromativeRange.svelte"
import Icon from "../Icon.svelte"

const steps = [
		'1 most popular job board in Poland, Facebook group, posters on Polish University of technology.'
		, '2 most popular job boards in Poland, 2 Facebook groups, posters on 1 Polish University.'
		, '3 most popular job boards in Poland, 2 Facebook groups, posters on 2 Polish Universities, Hunting on Linkedin.']

let currentStep = 0
$: alpha = 1 / steps.length + 1 / steps.length * currentStep

</script>

<div style="font-size: 1.5rem;max-width: 450px;margin:auto;">
	<Upload 
		dropFileTitle = "Drop job offer (*.pdf, *.docx, *.odt, *.md) or click to browse for a file."
		style = "max-width:450px;margin:auto">
	</Upload>
</div>
<div style="font-size: 1.5rem;max-width: 550px;margin:auto; text-align:center;">
	<h2>Select Job Offer Range</h2>
	<div style="display:flex;">
		<div style="flex-basis:0; flex-grow: 10;">
		<InformativeRange on:change={e => currentStep = e.detail} steps={steps}></InformativeRange>
		</div>
		<Icon name="cog" style="width:50px; height:auto; transition: all .2s;flex-basis:0; flex-grow: 1;margin-left:1rem"></Icon>
	</div>
</div>
<Icon name="poland" style="width:100%; height:474px; opacity:{alpha}; transition: all .2s"></Icon>
<button style="display:block; text-align: center; margin:auto;">Coming soon</button>

