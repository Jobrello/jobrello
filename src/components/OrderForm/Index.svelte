<script lang="ts">
import Upload from "./Upload.svelte"
import InformativeRange from "./InfromativeRange.svelte"
import Icon from "../Icon.svelte"

const steps = [
		'1 most popular job board in Poland, Facebook group, posters on Polish University of technology.'
		, '2 most popular job boards in Poland, 2 Facebook groups, posters on 1 Polish University.'
		, '3 most popular job boards in Poland, 2 Facebook groups, posters on 2 Polish Universities, Hunting on Linkedin.']

let currentStep = 0
let customMode = false

const onCustomClick = () => customMode = !customMode

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
	{#if !customMode}
	<div style="display:flex; min-height:160px">
		<div style="flex-basis:0; flex-grow: 10;">
		<InformativeRange on:change={e => currentStep = e.detail} steps={steps}>
			<div on:click={onCustomClick} style="display: flex; flex-direction:column; cursor: pointer;">
				<Icon name="cog" style="width:50px; height:50px; fill:#393939"></Icon>
				<small style="font-size: .9rem;"><u>customize</u></small>
			</div>
		</InformativeRange>
		</div>
	</div>
	{:else}
	<div on:click={onCustomClick} style="cursor:pointer; color:var(--jobrella-accent-color); margin-top:-2rem;">
		<small>←<u>back to classic mode</u></small>
	</div>
	<ul style="text-align: left;">
		<li>Number of job boards</li>
		<li>Number of bumps in job boards</li>
		<li>Social media, forums</li>
		<li>Hunting on Linkedin</li>
	</ul>
	
	{/if}
</div>
<Icon name="poland" style="width:100%; height:474px; opacity:{alpha}; transition: all .2s"></Icon>
<button style="display:block; text-align: center; margin:auto;">Coming soon</button>

