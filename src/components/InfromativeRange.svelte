<script lang="ts">
    import Range from "./Range.svelte"
    export let steps: string[]
    let currentStep = 0
</script>

<Range 
    min={0} 
    max={steps.length-1}
    on:change={(e) => currentStep = e.detail}
    value={0}>
</Range>
<div style="text-align: center; padding:1rem;">
    {steps[currentStep]}
</div>
