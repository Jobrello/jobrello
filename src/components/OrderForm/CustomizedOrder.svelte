<script lang="ts">
  import {Options, SelectedOptions, RangeOption} from './models'
  import Checkbox from '../Checkbox.svelte'
  import Range from './Range.svelte'
  import {createEventDispatcher} from 'svelte'

  export let options: Options
  const dispatch = createEventDispatcher()
  const choices : Array<'JobBoards' | 'NumberOfBumps' | 'SocialMedias'>  = ['JobBoards', 'NumberOfBumps', 'SocialMedias']
  let selections: SelectedOptions = {
    JobBoards: options.JobBoards[1][0],
    HeadHunter: false,
    NumberOfBumps: options.NumberOfBumps[1][0],
    SocialMedias: options.SocialMedias[1][0]
  }

  const dispatchChange = () => dispatch('change', selections)

  const onRangeChange = (
    index: 'JobBoards' | 'NumberOfBumps' | 'SocialMedias',
    choice: RangeOption
  ) => {
    selections[index] = choice
    dispatchChange()
  }

  const onCheckedChange = (isChecked: boolean) => {
    selections.HeadHunter = isChecked
    dispatchChange()
  }
</script>

<ul style="text-align: left; padding-left:0;">
  {#each choices as name}
    <li style="display: flex; justify-content: space-between; padding: .5rem;">
      <div>
        <div>{options[name][0]}</div>
        <div>
          <small
            >{selections[name] == undefined
              ? options[name][0][0]
              : selections[name][0]}</small>
        </div>
      </div>
      <div class="range" style="margin-top: .5rem">
        <Range
          min={0}
          max={options[name][1].length - 1}
          on:change={(e) => onRangeChange(name, options[name][1][e.detail])}
          value={0} />
      </div>
    </li>
  {/each}
  <li style="display: flex; justify-content: space-between; padding: .5rem;">
    <div style="margin-right:124px;width:100%">
      <Checkbox on:change={(e) => onCheckedChange(e.detail)}>
        {options.HeadHunter[0]}
      </Checkbox>
    </div>
  </li>
</ul>

<style>
  .range {
    min-width: 150px;
    max-width: 150px;
  }
</style>
