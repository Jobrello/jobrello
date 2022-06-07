<script lang="ts">
    import {Option, RangeOption} from "./models"
    import Checkbox from "../Checkbox.svelte"
    import Range from "./Range.svelte"
    import { createEventDispatcher } from "svelte"

    export let options: Option[]
    const dispatch = createEventDispatcher()
    let selections: string[] = []

    const dispatchChange = () => dispatch('change', selections)

    const onRangeChange = (index: number, choice: RangeOption) => {
        selections[index] = choice[0]
        dispatchChange()
    }

    const onCheckedChange = (index: number, isChecked: boolean, choice: string) => {
        selections[index] = isChecked ? choice : ''
        dispatchChange()
    }
</script>

<style>
    .range {
        min-width: 150px;
        max-width: 150px;
    }
</style>

<ul style="text-align: left; padding-left:0;">
    {#each options as [name, choices], index} 
    <li style="display: flex; justify-content: space-between; padding: .5rem;">
        {#if Array.isArray(choices)}
            <div>
                <div>{name}</div>
                <div><small>{selections[index] == undefined 
                                                ? choices[0][0]
                                                : selections[index]
                                                }</small></div>
            </div>
            <div class="range" style="margin-top: .5rem">
                <Range 
                    min={0} 
                    max={choices.length-1}
                    on:change={e => onRangeChange(index, choices[e.detail])}
                    value={0}>
                </Range>
            </div>
        {:else if typeof choices == "boolean"}
            <div style="margin-right:124px;width:100%">
                <Checkbox 
                    checked={choices} 
                    on:change={e => onCheckedChange(index, e.detail, name)}>
                    {name}
                </Checkbox>
            </div>
        {/if}
    </li>
    {/each}
</ul>