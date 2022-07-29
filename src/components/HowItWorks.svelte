<script lang="ts">
  import Accordion from '../components/Accordion.svelte'
</script>

<Accordion>
  <span slot="summary"
    >HOW IT WORKS<span style="color:var(--jobrella-accent-color);">&nbsp;?</span
    ></span>
  <span slot="content">
    <p style="font-size: 0.8em">
      We know how and where software engineers look for jobs.
    </p>
    <ol>
      <li>Write Job Description - pdf/odt/docx is perfect*. Include job salary range (not required but we know that it helps to get more trackion)</li>
      <li>Pick Employment Country (for now we support Poland)**</li>
      <li>Choose the range that you are satisfied with</li>
      <li>We post your job offer to different places within 24h</li>
      <li>We let You know it is done</li>
      <li>Wait for CVs from candidates</li>
    </ol>
    <p style="font-size: 0.8em">
      * Please include Your company logo.<br/>
      **We are buidling connections to provide trustworthy services in<br />Netherlands,
      Great Britain, Czech Republic, and more to come.
    </p>
  </span>
</Accordion>

<style>
  ol li::marker {
    color: var(--jobrella-accent-color);
  }
</style>
