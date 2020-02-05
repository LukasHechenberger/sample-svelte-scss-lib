<script>
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<style type="text/scss">
  @import 'my-lib/theme.scss';

  button {
    background-color: $primary;
    color: $primary-inverted;
    border: none;
    padding: 8px 12px;
    border-radius: 2px;
  }
</style>

<button on:click={handleClick}>Clicked {count} {count === 1 ? 'time' : 'times'}</button>
