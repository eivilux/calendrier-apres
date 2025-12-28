<script lang="ts">
import { onMount } from 'svelte';
const caseCache: Record<string, any> = {};
function isDayOpen(day: CalendarDay): boolean {
	const now = new Date();
	if (now.getMonth() === 11 && day.month === 0) {
		return false;
	}
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	let year = now.getFullYear();
	if (day.month === 11 && now.getMonth() === 0) {
		year = year - 1;
	}
	const dayDate = new Date(year, day.month, day.dayNumber);
	return dayDate.getTime() <= today.getTime();
}
onMount(() => {
	for (const day of calendarDays) {
		let caseNumber = day.dayNumber;
		let cacheKey = `${day.month}-${caseNumber}`;
		if (caseCache[cacheKey]) continue;
		if (day.month === 11) {
			import(`../lib/cases/Case${caseNumber}.svelte`).then(mod => {
				caseCache[cacheKey] = mod.default;
			}).catch(() => {});
		} else if (day.month === 0 && caseNumber === 1) {
			import(`../lib/cases/Case1.svelte`).then(mod => {
				caseCache[cacheKey] = mod.default;
			}).catch(() => {});
		} else if (day.month === 0 && caseNumber === 2) {
			import(`../lib/cases/Case2.svelte`).then(mod => {
				caseCache[cacheKey] = mod.default;
			}).catch(() => {});
		}
	}
});
let CaseComponent: any = null;

interface CalendarDay {
	dayNumber: number;
	month: number;
}

const calendarDays: CalendarDay[] = [
	{ dayNumber: 29, month: 11 },
	{ dayNumber: 30, month: 11 },
	{ dayNumber: 31, month: 11 },
	{ dayNumber: 1, month: 0 },
	{ dayNumber: 2, month: 0 }
];



let isModalOpen: boolean = false;
let selectedDay: CalendarDay | null = null;
let canOpenDay: boolean = false;



async function handleOpenModal(day: CalendarDay): Promise<void> {
	if (!isDayOpen(day)) return;
	selectedDay = day;
	isModalOpen = true;
	canOpenDay = true;
	let caseNumber = day.dayNumber;
	if (day.month === 11) {
		CaseComponent = (await import(`../lib/cases/Case${caseNumber}.svelte`)).default;
	} else if (day.month === 0 && caseNumber === 1) {
		CaseComponent = (await import(`../lib/cases/Case1.svelte`)).default;
	} else if (day.month === 0 && caseNumber === 2) {
		CaseComponent = (await import(`../lib/cases/Case2.svelte`)).default;
	} else {
		CaseComponent = null;
	}
}

function handleCloseModal(): void {
  isModalOpen = false;
  selectedDay = null;
  canOpenDay = false;
  CaseComponent = null;
}
</script>




<main class="min-h-screen flex flex-col py-4 px-3 xs:px-4 sm:py-8 sm:px-6 overflow-x-hidden items-center w-full">
	<style>
		:global(body) {
			overflow-y: scroll;
		}
	</style>
	<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg absolute top-0 left-0 w-full pt-6 z-10">
		Eivilux - Calendrier de l'Après
	</h1>
	<div class="absolute inset-0 flex items-center justify-center w-full">
		<div class="flex flex-row flex-wrap justify-center items-center gap-4 max-w-5xl w-full">
			{#each calendarDays as calendarDay}
				       <button
					       class="w-[140px] h-[140px] rounded-lg sm:rounded-xl bg-white/60 backdrop-blur-md border-2 border-white/60 flex flex-col items-center justify-center shadow-xl transition-all text-neutral-900 text-lg sm:text-xl font-semibold relative group select-none mx-1 my-1 extra-dark-case hover:bg-white/80 group-hover:border-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed"
					       aria-label={`${calendarDay.dayNumber} ${calendarDay.month === 11 ? 'décembre' : 'janvier'}`}
					       on:click={() => isDayOpen(calendarDay) && handleOpenModal(calendarDay)}
					       disabled={!isDayOpen(calendarDay)}
				       >
					<span class="z-10 font-bold text-xl sm:text-2xl md:text-3xl select-none">{calendarDay.dayNumber}</span>
					<span class="absolute inset-0 rounded-lg sm:rounded-xl border-2 bor\tnsparent transition-all"></span>
				</button>
			{/each}
		</div>
	</div>

		{#if isModalOpen && selectedDay}
			<div
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
				role="dialog"
				aria-modal="true"
				tabindex="0"
				on:keydown={(event) => {
					if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') handleCloseModal();
				}}
			>
				<button
					type="button"
					aria-label="Fermer la modal"
					class="absolute inset-0 w-full h-full bg-transparent cursor-pointer z-40"
					on:click={handleCloseModal}
					tabIndex="0"
				></button>
				<div class="flex items-center justify-center w-full h-full">
				  <div role="presentation" class="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-6 flex flex-col items-center relative animate-fade-in z-50 mx-auto" style="box-sizing: border-box; overflow-y: auto; max-height:90vh; width: 480px; max-width: 95vw; margin-left: auto; margin-right: auto;" on:click|stopPropagation>
					  <button type="button" class="absolute right-6 sm:right-8 text-gray-500 hover:text-gray-800 text-xl sm:text-2xl" aria-label="Fermer" on:click={handleCloseModal}>&times;</button>
						<span class="text-lg sm:text-xl font-bold text-gray-800">{selectedDay.dayNumber} {selectedDay.month === 11 ? 'décembre' : 'janvier'}</span>
					  <div class="w-full flex flex-col items-center">
						  {#if canOpenDay}
							  {#if CaseComponent}
								  <svelte:component this={CaseComponent} />
							  {:else}
								  <span class="text-gray-400 text-base mb-2">Aucun contenu pour ce jour</span>
							  {/if}
						  {/if}
					  </div>
				  </div>
				</div>
			</div>
		{/if}
</main>