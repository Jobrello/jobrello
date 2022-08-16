<script lang="ts">
    import Range from "./Range.svelte"
    
    export let steps: string[]
    export let currentStep = 0
</script>

<Range 
    min={0} 
    max={steps.length-1}
    on:change={(e) => currentStep = e.detail}
    on:change
    value={0}>
</Range>
<div style="text-align: center; padding-top:1rem; display:flex;">
    <div>
        {steps[currentStep]}
    </div>
    <slot></slot>
</div>
