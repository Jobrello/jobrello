<script lang="ts">
import Upload from "./Upload.svelte"
import InformativeRange from "./InfromativeRange.svelte"
import CustomizedOrder from "./CustomizedOrder.svelte"
import Icon from "../Icon.svelte"
import { Option } from "./models"

let selections: string[] = []

const steps = [
		'1 most popular job board in Poland, Facebook group, posters on Polish University of technology.'
		, '2 most popular job boards in Poland, 2 Facebook groups, posters on 1 Polish University.'
		, '3 most popular job boards in Poland, 2 Facebook groups, posters on 2 Polish Universities, Hunting on Linkedin.']

const customOptions: Option[] = [
	['Job boards range', ['None', '1 job board', '2 job boards', '3 job boards']],
	['Number of bumps in job boards', ['None', '1 bump', '2 bumps', '3 bumps']],
	['Social media & forums', ['None', '1 facebook group', '2 facebook groups, 1 slack community']],
	['Head hunter', false]
]

let currentStep = 0
let customMode = false

const onCustomClick = () => customMode = !customMode
const onRangeChange = (event: CustomEvent<number>) => {
	currentStep = event.detail
	selections = [steps[currentStep]]
}

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
			<InformativeRange on:change={onRangeChange} steps={steps}>
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
		<CustomizedOrder options={customOptions} on:change={e => selections = e.detail}/>
	{/if}
</div>
<Icon name="poland" style="width:100%; height:474px; opacity:{alpha}; transition: all .2s"></Icon>
<button style="display:block; text-align: center; margin:auto;" on:click={() => console.log(selections)}>Coming soon</button>

