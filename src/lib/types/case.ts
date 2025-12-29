import { BOT_PICS } from '$lib/config/specialCases';
import { MONTHS } from '$lib/config/consts';

import { asset } from '$app/paths';

export interface Case {
    dayNumber: number;
    month: number;
    year: number;

    component: string;
    image: string;

    canShow: boolean;
}

export namespace Case {
    export function fromFile(filePath: string, now: Date): Case | null {
        const filename = filePath.split('.')[0];
        const sveltefile = `../lib/cases/${filename}.svelte`;
        const imagepath = asset(`images/cases/${filePath}`);

        const [year, month, day] = filename.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        if (isNaN(date.getTime())) {
            return null;
        }

        return {
            dayNumber: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            
            component: sveltefile,
            image: imagepath,

            canShow: now.getTime() > date.getTime()
        };
    }

    export function compare(a: Case, b: Case): number {
        if (a.year !== b.year) return a.year - b.year;
        if (a.month !== b.month) return a.month - b.month;

        return a.dayNumber - b.dayNumber;
    }

    export function getMonthName(c: Case): string {
        return MONTHS[c.month - 1];
    }

    export function getString(c: Case): string {
        return `${c.dayNumber} ${Case.getMonthName(c)} ${c.year}`;
    }


    export function isBotPic(c: Case): boolean {
        return BOT_PICS.some(
            (d) =>
                d.day === c.dayNumber &&
                d.month === c.month &&
                d.year === c.year
        );
    }
}

