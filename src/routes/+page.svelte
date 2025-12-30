<script lang="ts">
	import type { Case } from '$lib/types/case';
	import { Case as CaseNamespace } from '$lib/types/case';
	import CaseLayout from '$lib/components/CaseLayout.svelte';

	import type { SvelteComponent } from 'svelte';
	import { onMount } from 'svelte';

	export let data: { cases: Case[] };

	const cases = import.meta.glob<{ default: typeof SvelteComponent }>('../lib/cases/*.svelte');

	let selectedDay: Case | null = null;
	let component: typeof SvelteComponent | null = null;

	async function openCase(Case: Case): Promise<void> {
		if (!Case.canShow) return;

		const loader = cases[Case.component];
		if (!loader) {
			component = null;
			return;
		}

		selectedDay = Case;
		component = (await loader()).default;
	}

	function closeCase(): void {
		selectedDay = null;
		component = null;
	}

	onMount(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		data.cases = data.cases.map(c => {
			const caseDate = new Date(c.year, c.month - 1, c.dayNumber);
			caseDate.setHours(0, 0, 0, 0);

			return {
				...c,
				canShow: caseDate <= today
			};
		});
	});
</script>

<main class="min-h-screen flex flex-col py-4 px-3 xs:px-4 sm:py-8 sm:px-6 overflow-x-hidden items-center w-full">
	<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg absolute top-0 left-0 w-full pt-6 z-10">
		Eivilux - Calendrier de l'Après
	</h1>

	<div class="absolute inset-0 flex items-center justify-center w-full">
		<div class="flex flex-row flex-wrap justify-center items-center gap-4 max-w-5xl w-full">
			{#each data.cases as Case}
				<button
					class="w-[140px] h-[140px] rounded-lg sm:rounded-xl bg-white/60 backdrop-blur-md border-2 border-white/60 flex flex-col items-center justify-center shadow-xl transition-all text-neutral-900 text-lg sm:text-xl font-semibold relative group select-none mx-1 my-1 extra-dark-case hover:bg-white/80 group-hover:border-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed"
					aria-label={CaseNamespace.getString(Case)}
					on:click={() => openCase(Case)}
					disabled={!Case.canShow}
				>
					<span class="z-10 font-bold text-xl sm:text-2xl md:text-3xl select-none">
						{Case.dayNumber}
					</span>
					<span class="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent transition-all"></span>
				</button>
			{/each}
		</div>
	</div>

	{#if selectedDay}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
			role="dialog"
			aria-modal="true"
			tabindex="0"
		>
			<button
				type="button"
				aria-label="Fermer la case"
				class="absolute inset-0 w-full h-full bg-transparent cursor-pointer z-40"
				on:click={closeCase}
				tabindex="0"
			></button>

			<div class="flex items-center justify-center w-full h-full">
				<div
					role="presentation"
					class="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-6 flex flex-col items-center relative animate-fade-in z-50 mx-auto"
					style="box-sizing: border-box; overflow-y: auto; max-height: 90vh; width: 480px; max-width: 95vw;"
					on:click|stopPropagation
				>
					<button
						type="button"
						class="absolute right-6 sm:right-8 text-gray-500 hover:text-gray-800 text-xl sm:text-2xl"
						aria-label="Fermer"
						on:click={closeCase}
					>
						&times;
					</button>

					<span class="text-lg sm:text-xl font-bold text-gray-800 mb-4">
						{CaseNamespace.getString(selectedDay)}
					</span>

					<div class="w-full flex flex-col items-center">
						{#if component}
							<CaseLayout image={selectedDay.image} alt="{CaseNamespace.getString(selectedDay)}" image_bot={CaseNamespace.isBotPic(selectedDay)}>
								<svelte:component this={component} />
							</CaseLayout>
						{:else}
							<span class="text-gray-400 text-base">Chargement…</span>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>