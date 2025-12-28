
<script>
   import { asset } from '$app/paths';
   const audio = asset('/audios/1.mp3');
</script>

<h2 class="text-xl font-bold mb-6 text-center">Ça y est, une nouvelle année démarre.</h2>
<p class="mb-4 text-center">Je vous souhaite à toutes et à tous le meilleur pour 2026, aussi bien professionnellement que personnellement.</p>
<p class="mb-4 text-center">Et quel meilleur timing que ce 1er janvier pour lancer enfin un projet qui me tient à cœur depuis longtemps : mes podcasts <span aria-label="casque audio" role="img">🎧</span></p>
<p class="mb-4 text-center">Tout au long de l’année, j’y partagerai des réflexions, des expériences de terrain et des rencontres autour du management et des Ressources Humaines.</p>
<p class="mb-4 text-center"><span class="inline-block mr-2" aria-label="main pointant">👉</span><em>Pour commencer, je vous propose cet épisode introductif.</em></p>
<audio controls class="mt-2 m-auto">
	<source src="{audio}" type="audio/mpeg" />Votre navigateur ne supporte pas la lecture audio.
</audio>
<p class="text-center mt-4 text-4xl font-extrabold text-green-900">Très belle année à vous.</p>
