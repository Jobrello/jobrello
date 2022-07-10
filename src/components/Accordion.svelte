<div class="tabs">
  <div class="tab">
    <input type="checkbox" id="chck1" />
    <label class="tab-label" for="chck1">
      <slot name="summary" />
    </label>
    <div class="tab-content">
      <slot name="content" />
    </div>
  </div>
</div>

<style>
  .tab {
    width: 100%;
    overflow: hidden;
  }
  .tab-label {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    cursor: pointer;
  }
  .tab-label::after {
    content: '\276F';
    width: 1em;
    height: 1em;
    text-align: center;
    color:var(--jobrella-accent-color);
    transition: all 0.35s;
  }
  .tab-content {
    max-height: 0;
    padding: 0 1em;
    transition: all 0.35s;
  }
  input + .tab-label {
    background: #e6e6e6;
  }
  input:checked + .tab-label::after {
    transform: rotate(90deg);
  }
  input:checked ~ .tab-content {
    max-height: 100vh;
  }
  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
</style>
