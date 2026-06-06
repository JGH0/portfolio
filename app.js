// Fetch projects from GitHub and render them
(async function () {
	const grid = document.getElementById('project-grid');
	if (!grid) return;

	const excluded = ['JGH0', 'portfolio'];
	const featured	= ['jtop', 'AsciiCardForge', 'MyI3Config', 'Todo-App', 'waifufetch'];
	const secondary = ['Todo-App-Backend', 'BlackjackConsole'];

	try {
		const res = await fetch('https://api.github.com/users/JGH0/repos?sort=updated&per_page=20');
		if (!res.ok) throw new Error('GitHub API error');
		const repos = await res.json();

		const map = {};
		for (const r of repos) map[r.name] = r;

		// Build ordered list: featured first (in order), then secondary, then the rest
		const ordered = [];
		const seen = new Set();

		for (const name of [...featured, ...secondary]) {
			if (map[name]) {
				ordered.push(map[name]);
				seen.add(name);
			}
		}

		for (const r of repos) {
			if (!seen.has(r.name) && !excluded.includes(r.name)) {
				ordered.push(r);
				seen.add(r.name);
			}
		}

		if (ordered.length === 0) {
			grid.innerHTML = '<p class="loading">No projects found.</p>';
			return;
		}

		grid.innerHTML = ordered.map(r => {
			const desc = r.description || '';
			const lang = r.language || '';
			const stars = r.stargazers_count || 0;
			const imgHtml = '';
			const starsHtml = stars > 0 ? `<span class="project-stars">&#9733; ${stars}</span>` : '';
			const langHtml = lang ? `<span class="project-lang">${lang}</span>` : '';

			return `
				<div class="project-card">
					${imgHtml}
					<div class="project-body">
						<h3><a href="${r.html_url}" target="_blank">${r.name}</a></h3>
						<p class="project-desc">${desc || 'No description.'}</p>
						<div class="project-meta">
							${langHtml}
							${starsHtml}
						</div>
					</div>
				</div>
			`;
		}).join('');
	} catch (err) {
		grid.innerHTML = '<p class="loading">Could not load projects from GitHub. Try again later.</p>';
		console.error(err);
	}
})();
