<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<section class="about">
  <h1 class="text-2xl mb-2">{$_('about.title')}</h1>
  <p>
    {$_('about.intro')}
  </p>
  <h2 class="text-xl mb-1">{$_('about.featuresTitle')}</h2>
  <ul class="list-disc pl-5">
    <li>{$_('about.feature1')}</li>
    <li>{$_('about.feature2')}</li>
    <li>{$_('about.feature3')}</li>
    <li>{$_('about.feature4')}</li>
    <li>{$_('about.feature5')}</li>
    <li>{$_('about.feature6')}</li>
  </ul>
  <h2 class="text-xl mb-1">{$_('about.usageTitle')}</h2>
  <ol class="list-decimal pl-5">
    <li>{$_('about.usage1')}</li>
    <li>{$_('about.usage2')}</li>
    <li>{$_('about.usage3')}</li>
  </ol>
</section>

<style>
  .about {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fafbfc;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }
  h1, h2 {
    color: #2a3a4a;
    margin-top: 1.5rem;
  }
  ul, ol {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }
  li {
    margin-bottom: 0.5rem;
  }
</style>