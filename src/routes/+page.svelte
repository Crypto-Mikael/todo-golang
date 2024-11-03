<script lang="ts">
  import { writable } from "svelte/store";
  import { changeTheme } from "tailwind-material";
  type TODO_LIST = { id: number; text: string; edit: boolean };
  let inputValue = "";

  function createTODO() {
    const { subscribe, update } = writable<TODO_LIST[]>([]);

    return {
      subscribe,
      add: () =>
        update((n) =>
          n.concat({ id: Date.now(), text: inputValue, edit: false })
        ),
      remove: (id: number) => update((n) => n.filter((item) => item.id !== id)),
      toggleEdit: (id: number) => {
        update((n) => {
          const index = n.findIndex((item) => item.id === id);
          n[index].edit = !n[index].edit;
          return n;
        });
      },
    };
  }
  let TODO = createTODO();
</script>

<header class="text-lg">
  <h1 class="text-6xl min-h-12 text-on-surface text-center">TODO LIST</h1>
</header>
<main class="flex h-full items-center justify-center">
  <section
    class="bg-surface-container flex flex-col h-[75dvh] w-2/6 rounded-xl"
  >
    <div
      class="w-full bg-surface-container-high h-16 rounded-t-xl flex items-center justify-end pr-4"
    >
      <div class="md-input-wrapper w-full p-4">
        <input
          class="md-input"
          bind:value={inputValue}
          placeholder="NEW TODO..."
        />
      </div>
      <button class="md-icon-button-filled" on:click={TODO.add}>add</button>
    </div>
    <article class="flex flex-col p-4 overflow-y-auto max-w-[50dvw] h-full">
      <ul class="flex flex-col gap-4 h-full">
        {#each $TODO as item}
          <li class="text-on-surface flex items-center gap-4">
            {#if !item.edit}
              <p
                class="bg-surface-container-highest whitespace-normal rounded-2xl p-4 break-all w-full"
              >
                {item.text}
              </p>
              <button
                class="md-icon-button-filled"
                on:click={() => TODO.remove(item.id)}>delete</button
              >
              <button
                class="md-icon-button-filled"
                on:click={() => TODO.toggleEdit(item.id)}>edit</button
              >
            {:else}
              <input bind:value={item.text} class="w-full md-input" />
              <button
                class="md-icon-button-filled"
                on:click={() => TODO.toggleEdit(item.id)}>close</button
              >
            {/if}
          </li>
        {/each}
      </ul>
    </article>
  </section>
</main>
<footer class="bg-surface-container min-h-6"></footer>

<button
  class="absolute left-4 bottom-4 md-icon-button-filled"
  on:click={changeTheme}
>
  palette
</button>

<style lang="postcss">
</style>
