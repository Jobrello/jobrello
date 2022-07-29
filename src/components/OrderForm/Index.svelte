<script lang="ts">
  import Upload from './Upload.svelte'
  import InformativeRange from './InfromativeRange.svelte'
  import CustomizedOrder from './CustomizedOrder.svelte'
  import Icon from '../Icon.svelte'
  import {Options, SelectedOptions} from './models'
  import Button from '../Button.svelte'
  import {scale} from 'svelte/transition'
  import Email from './Email.svelte'

  export let steps: [string, number][] = [
    [
      '1 most popular job board in Poland, 1 bump, 1 Facebook group, posters on Polish University of technology.',
      200
    ],
    [
      '2 most popular job boards in Poland, 2 bumps, 1 Facebook group, 1 Reddit group, posters on 1 Polish University.',
      520
    ],
    [
      '3 most popular job boards in Poland, 2 bumps, 2 Facebook groups, 1 Reddit group, posters on 2 Polish Universities.',
      800
    ]
  ]

  let mail = ''

  export let customOptions: Options = {
    JobBoards: [
      'Job boards range',
      [
        ['None', 0],
        ['1 job board', 194],
        ['2 job boards', 392],
        ['3 job boards', 580]
      ]
    ],
    NumberOfBumps: [
      'Number of bumps in job boards',
      [
        ['1 bump', 1],
        ['2 bumps', 1.33],
        ['3 bumps', 1.74]
      ]
    ],
    SocialMedias: [
      'Social media & forums',
      [
        ['None', 0],
        ['1 facebook group', 5],
        ['2 facebook groups, 1 slack community', 20]
      ]
    ],
    HeadHunter: ['Head hunter']
  }

  const emptySelections = () => {
    return {
      HeadHunter: false,
      JobBoards: customOptions.JobBoards[1][0],
      NumberOfBumps: customOptions.NumberOfBumps[1][0],
      SocialMedias: customOptions.SocialMedias[1][0]
    }
  }

  let selections: SelectedOptions = emptySelections()

  let currentStep = 0
  let customMode = false
  let file: File

  const onCustomClick = () => {
    customMode = !customMode
    selections = emptySelections()
    computePrice()
  }
  const onRangeChange = (event: CustomEvent<number>) => {
    currentStep = event.detail
    selections = emptySelections()
    computePrice()
  }

  const onFileSelected = (event: CustomEvent<File>) => {
    file = event.detail
  }

  const onSubmitClick = async () => {
    let url = '/.netlify/functions/placeOrder'
    const formData = new FormData()
    formData.append('sender', 'TEST@SENDER.COM')
    formData.append(
      'inquiry',
      `custom: ${customMode}; step: ${currentStep}; boards: ${selections.JobBoards[0]}; bumps: ${selections.NumberOfBumps[0]}; socials: ${selections.SocialMedias[0]}; headHunter: ${selections.HeadHunter}; price: ${price}`
    )
    formData.append('jobOffer', file)

    const options = {
      method: 'POST',
      body: formData
    }
    await fetch(url, options)
  }

  $: alpha = 1 / steps.length + (1 / steps.length) * currentStep

  const computeCustomPrice = (selections: SelectedOptions): string => {
    if (selections.HeadHunter) return 'Individual quote'
    return `${Math.ceil(
      selections.JobBoards[1] * selections.NumberOfBumps[1] +
        selections.SocialMedias[1]
    )} €`
  }

  const computeStepPrice = (step: number): string => {
    return `${steps[step][1]} €`
  }

  let price = ''

  const computePrice = (): void => {
    if (customMode) price = computeCustomPrice(selections)
    else price = computeStepPrice(currentStep)
  }

  computePrice()
</script>

<div style="font-size: 1.5rem;max-width: 450px;margin:auto;">
  <Upload
    on:file-selected={onFileSelected}
    dropFileTitle="Drop job offer (*.pdf, *.docx, *.odt, *.md) or click to browse for a file."
    style="max-width:450px;margin:auto" />
  <div style="margin-top: 1rem;" />
  <Email bind:mail />
</div>
<div style="font-size: 1.5rem;max-width: 550px;margin:auto; text-align:center;">
  <h2>
    Select Job Offer Range: <span style="color: var(--jobrella-accent-color)"
      >{price}</span>
  </h2>
  {#if !customMode}
    <div style="display:flex; min-height:160px">
      <div style="flex-basis:0; flex-grow: 10;">
        <InformativeRange
          on:change={onRangeChange}
          steps={steps.map((s) => s[0])}>
          <div
            on:click={onCustomClick}
            style="display: flex; flex-direction:column; cursor: pointer;">
            <Icon name="cog" style="width:50px; height:50px; fill:#393939" />
            <small style="font-size: .9rem;"><u>customize</u></small>
          </div>
        </InformativeRange>
      </div>
    </div>
  {:else}
    <div in:scale>
      <div
        on:click={onCustomClick}
        style="cursor:pointer; color:var(--jobrella-accent-color); margin-top:-2rem;">
        <small>←<u>back to classic mode</u></small>
      </div>
      <CustomizedOrder
        options={customOptions}
        on:change={(e) => {
          selections = e.detail
          computePrice()
        }} />
    </div>
  {/if}
</div>
<div style="display:grid; place-items:center;margin-top:3rem;">
  <div style="grid-area: 1/1; z-index:1; margin-top:-10%">
    <Button on:click={onSubmitClick}>Submit!</Button>
  </div>
  <Icon
    name="poland"
    style="width:100%; height:474px; opacity:{alpha}; transition: all .2s; grid-area: 1/1" />
</div>
