<script lang="ts">
import Upload from "./Upload.svelte"
import InformativeRange from "./InfromativeRange.svelte"
import CustomizedOrder from "./CustomizedOrder.svelte"
import Icon from "../Icon.svelte"
import { Option, OfferSelection } from "./models"
import Button from "../Button.svelte"
import { scale } from 'svelte/transition'

export let steps: [string, number][]  = [
		['1 most popular job board in Poland, Facebook group, posters on Polish University of technology.', 110]
		, ['2 most popular job boards in Poland, 2 Facebook groups, posters on 1 Polish University.', 190]
		, ['3 most popular job boards in Poland, 2 Facebook groups, posters on 2 Polish Universities, Hunting on Linkedin.', 345]
	]

let selections: OfferSelection[] = [steps[0]]

export let customOptions: Option[] = [
	['Job boards range', [
		['None', 0]
		, ['1 job board', 10]
		, ['2 job boards', 20]
		, ['3 job boards', 30]
	]],
	['Number of bumps in job boards', [
		['None', 0]
		, ['1 bump', 15]
		, ['2 bumps', 25]
		, ['3 bumps', 35]
	]],
	['Social media & forums', [
		['None', 0]
		, ['1 facebook group', 5]
		, ['2 facebook groups, 1 slack community', 20]
	]],
	['Head hunter', false, 90]
]

let currentStep = 0
let customMode = false

const onCustomClick = () => { 
	customMode = !customMode 
	selections = customMode ? [['', 0]] : [steps[0]]
}
const onRangeChange = (event: CustomEvent<number>) => {
	currentStep = event.detail
	selections = [steps[currentStep]]
}

$: alpha = 1 / steps.length + 1 / steps.length * currentStep

$: price = selections
			.map(selection => selection[1])
			.reduce((prev, current) => prev + current)

</script>

<div style="font-size: 1.5rem;max-width: 450px;margin:auto;">
	<Upload 
		dropFileTitle = "Drop job offer (*.pdf, *.docx, *.odt, *.md) or click to browse for a file."
		style = "max-width:450px;margin:auto">
	</Upload>
</div>
<div style="font-size: 1.5rem;max-width: 550px;margin:auto; text-align:center;">
	<h2>Select Job Offer Range <span>{price} €</span></h2>
	{#if !customMode}
		<div style="display:flex; min-height:160px">
			<div style="flex-basis:0; flex-grow: 10;">
			<InformativeRange on:change={onRangeChange} steps={steps.map(s=> s[0])}>
				<div on:click={onCustomClick} style="display: flex; flex-direction:column; cursor: pointer;">
					<Icon name="cog" style="width:50px; height:50px; fill:#393939"></Icon>
					<small style="font-size: .9rem;"><u>customize</u></small>
				</div>
			</InformativeRange>
			</div>
		</div>
	{:else}
		<div in:scale>
			<div on:click={onCustomClick} style="cursor:pointer; color:var(--jobrella-accent-color); margin-top:-2rem;">
				<small>←<u>back to classic mode</u></small>
			</div>
			<CustomizedOrder options={customOptions} on:change={e => selections = e.detail}/>
		</div>
	{/if}
</div>
<div style="display:grid; place-items:center;">
	<div style="grid-area: 1/1; z-index:1; margin-top:-10%">
		<Button on:click={() => console.log(selections)}>Submit!</Button>
	</div>
	<Icon name="poland" style="width:100%; height:474px; opacity:{alpha}; transition: all .2s; grid-area: 1/1"></Icon>
</div>

