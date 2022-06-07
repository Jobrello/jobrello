<script lang="ts">
import { createEventDispatcher } from "svelte";


  export let dropFileTitle = "Drop job offer (*.pdf, *.docx, *.odt, *.md) or click to browse for a file."
  export let style = ""

  const dispatch = createEventDispatcher()

  let isOver = false
  let fileInput: HTMLInputElement
  let selectedFile: File

  const handleDrop = (ev: DragEvent) => {
    ev.preventDefault()
    const items = ev.dataTransfer?.items
    if(items == undefined) return
    const fileCandidate = items[0].getAsFile()
    if(fileCandidate) {
      selectedFile = fileCandidate
    }
    isOver = false
  }

  const onInputChanged = () => {
    const files = fileInput?.files
    files && (selectedFile = files[0])
    dispatch('file-selected', selectedFile)
  }

  const onOver = (ev: DragEvent) => {
    ev.preventDefault()
    isOver = true
  }

</script>

<style>
  .dropzone {
    min-width:300px; 
    height:75px; 
    border:1px dashed black; 
    border-radius:.25rem; 
    display: block;
    text-align:center;
    background-color: white;
    padding: 1rem;
    transition: .3s;
  }

  .isOver {
    background-color: black;
    color:white;
  }
  
</style>

<div style={style}>
  <input
      style="display: none;"
      type="file" 
      bind:this={fileInput}
      on:change={onInputChanged}
      label="Upload file"
      data-testId='file-uploader'
      id="offerFile">
  <label class="dropzone" 
        on:dragover={onOver} 
        on:dragleave={() => isOver = false}
        on:drop={handleDrop} 
        class:isOver 
        for="offerFile">
        {#if !selectedFile}
            {dropFileTitle}
        {/if}
        {#if selectedFile}
            <div style="font-size: 2rem;">{selectedFile.name} ✅</div>
        {/if}
  </label>
</div>