import type { Case } from '$lib/types/case';
import { Case as CaseNamespace } from '$lib/types/case';

import { readdir } from 'fs/promises';
import path from 'path';

export async function load() {
    const now = new Date();

    const imagesPath = path.join(process.cwd(), 'static/images/cases');
    const files = await readdir(imagesPath);

    const days = files.map((file) => CaseNamespace.fromFile(file, now)).filter((c): c is Case => c !== null).sort(CaseNamespace.compare);

    return { days };
}