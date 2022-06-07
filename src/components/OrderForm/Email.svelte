<script lang="ts">
    export let mail:string
</script>
<style>
    input {
        border: none;
        background-color: white;
        text-align: center;
        border-bottom:2px solid var(--jobrella-accent-color);
        position: relative;
        padding: .5rem;
        box-sizing: border-box;
        min-width: 300px;
        width: 100%;
        font-size: 20px
    }
    input:focus {
        outline: none;
    }
    ::placeholder {
        color:var(--jobrella-accent-color);
        opacity: 0.8;
    }
</style>

<input type="email" placeholder="Your mail for the invoice" bind:value={mail}/>