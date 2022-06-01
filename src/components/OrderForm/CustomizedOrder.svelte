<script lang="ts">
    import {Option} from "./models"
    import Range from "./Range.svelte"

    export let options: Option[]

    let selections: string[] = []
</script>

<style>
    .range {
        min-width: 150px;
        max-width: 150px;
    }
</style>

<ul style="text-align: left;">
    {#each options as [name, choices], index} 
    <li style="display: flex; justify-content: space-between; padding: .5rem;">
        {#if Array.isArray(choices)}
            <div>
                <div>{name}</div>
                <div><small>{selections[index] == undefined 
                                                ? choices[0] 
                                                : selections[index]
                                                }</small></div>
            </div>
            <div class="range">
                <Range 
                    min={0} 
                    max={choices.length-1}
                    on:change={e => selections[index]=choices[e.detail]}
                    value={0}>
                </Range>
            </div>
        {:else if typeof choices == "boolean"}
            <label><input type="checkbox">{name}</label>
        {/if}
    </li>
    {/each}
</ul>