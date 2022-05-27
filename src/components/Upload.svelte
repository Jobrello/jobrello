<script lang="ts">
  export let dropFileTitle = "Drop job offer (*.pdf, *.docx, *.odt, *.md) or click to browse for a file."

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
  }

  .isOver {
    background-color: black;
    color:white;
  }
  
  input[type='file'] {
    color: rgba(0, 0, 0, 0)
  }

  input[type=file]::file-selector-button {
    padding: .2em .4em;
    border-radius: .2em;
    background-color: #a29bfe;
    outline: none;
    border: none;
    transition: 1s;
}

input[type=file]::file-selector-button:hover {
  background-color: #81ecec;
  border: 2px solid #00cec9;
}
</style>
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
          <div>{selectedFile.name} ✅</div>
       {/if}
</label>