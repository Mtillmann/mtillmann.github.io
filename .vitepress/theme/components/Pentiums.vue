<template>
    <div>
        <div class="sort-controls">
            <button
                v-for="col in sortableCols"
                :key="col.name"
                :class="{ active: sortCol === col.index }"
                @click="sortBy(col.index)"
            >
                {{ col.name }}
                <span v-if="sortCol === col.index">{{ sortDir === 1 ? '↑' : '↓' }}</span>
            </button>
        </div>
        <div class="cpu-layout">
            <div class="cpu-grid">
                <div
                    v-for="cpu in sortedCpus"
                    :key="cpu[0]"
                    class="cpu-cell"
                    :class="{ highlighted: hoveredColIndex !== null && cpu[hoveredColIndex] === hoveredValue }"
                >
                    <strong>#{{ cpu[0] }}</strong>
                </div>
            </div>
            <table class="cpu-table">
                <thead>
                    <tr>
                        <th v-for="col in sortableCols" :key="col.name">{{ col.name }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cpu in sortedCpus" :key="cpu[0]">
                        <td
                            v-for="col in sortableCols"
                            :key="col.name"
                            :class="{ highlighted: hoveredColIndex === col.index && cpu[col.index] === hoveredValue }"
                            @mouseenter="hoveredColIndex = col.index; hoveredValue = cpu[col.index]"
                            @mouseleave="hoveredColIndex = null; hoveredValue = null"
                            :title="col.name === 'plant' ? `actual plant: ${cpu[5]}` : ''"
                        >{{ cpu[col.index] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, computed, ref } from 'vue';


onBeforeMount(() => {
    console.log("Pentiums component mounted");
});

const cols = ['id', 'part number', 'S-Spec', 'frequency', 'plant', 'plant_actual', 'price'];

const cpus = [
    [1, 'A80502', 'SX968', 90, 'malaysia', 'A4', 849],
    [2, 'A80503', 'SL27K', 166, 'philippines', 'philippines', 749],
    [3, 'A80502', 'SX969', 75, 'malaysia', 'malay es', 800],
    [4, 'A80502', 'SX969', 75, 'malaysia', 'malay es', 800],
    [5, 'A80502', 'SY007', 100, 'malaysia', 'malay ew', 995],
    [6, 'A80502', 'SX969', 75, 'malaysia', 'malay es', 800],
    [7, 'A80502', 'SY022', 133, 'philippines', 'philippines', 935],
    [8, 'A80502', 'SX969', 75, 'malaysia', 'malay es', 800],
    [9, 'A80502', 'SY022', 133, 'philippines', 'philippines', 935],
    [10, 'A80502', 'SY022', 133, 'philippines', 'philippines', 935],
    [11, 'A80502', 'SX969', 75, 'malaysia', 'malay es', 800],
    [12, 'A80502', 'SX969', 75, 'malaysia', 'malay es', 800],
    [13, 'A80502', 'SY022', 133, 'philippines', 'philippines', 935],
    [14, 'A80502', 'SY022', 133, 'philippines', 'philippines', 935],
    [15, 'A80502', 'SX969', 75, 'malaysia', 'malay es', 800],
    [16, 'A80502', 'SX969', 75, 'malaysia', 'malay es', 800],
    [17, 'A80502', 'SY028', 133, 'philippines', 'philippines', 935],
    [18, 'A80502', 'SY022', 133, 'malaysia', 'malay', 935],
    [19, 'A80502', 'SX963', 100, 'malaysia', 'malay bv', 995],
    [20, 'A80503', 'SL27K', 166, 'philippines', 'philippines', 749],
    [21, 'A80502', 'SX970', 100, 'malaysia', 'malay 527 es', 995],
    [22, 'A80502', 'SK106J', 133, 'malaysia', 'malay es', 935],
    [23, 'A80503', 'SL27K', 166, 'philippines', 'philippines', 749],
    [24, 'A80503', 'SL27K', 166, 'philippines', 'philippines', 749],
    [25, 'A80502', 'SY007', 100, 'malaysia', 'malay ew', 995],
    [26, 'A80503', 'SY016', 166, 'philippines', 'philippines', 749],
    [27, 'A80502', 'SY007', 100, 'philippines', 'philippines', 995],
    [28, 'A80502', 'SX963', 100, 'malaysia', 'A4', 995],
    [29, 'A80502', 'SX969', 75, 'malaysia', 'A4', 800],
    [30, 'A80502', 'SX969', 75, 'malaysia', 'A4', 800],
    [31, 'A80502', 'SY022', 133, 'philippines', 'philippines', 935],
    [32, 'A80502', 'SK106J', 133, 'malaysia', 'A4', 935],
    [33, 'A80502', 'SX969', 75, 'philippines', 'philippines', 800],
    [34, 'A80502', 'SX969', 75, 'malaysia', 'A4', 800],
    [35, 'A80502', 'SX969', 75, 'philippines', 'philippines', 800],
    [36, 'A80502', 'SX968', 90, 'malaysia', 'malay 518 es', 849],
];

const sortableCols = cols
    .map((name, index) => ({ name, index }))
    .filter(col => col.name !== 'plant_actual');

const hoveredColIndex = ref(null);
const hoveredValue = ref(null);
const sortCol = ref(0);
const sortDir = ref(1);

function sortBy(colIndex) {
    if (sortCol.value === colIndex) {
        sortDir.value *= -1;
    } else {
        sortCol.value = colIndex;
        sortDir.value = 1;
    }
}

const sortedCpus = computed(() => {
    return [...cpus].sort((a, b) => {
        const av = a[sortCol.value];
        const bv = b[sortCol.value];
        if (av < bv) return -1 * sortDir.value;
        if (av > bv) return 1 * sortDir.value;
        return 0;
    });
});

</script>

<style scoped>
.sort-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}
.sort-controls button.active {
    font-weight: bold;
}
.cpu-layout {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
}
.cpu-table {
    border-collapse: collapse;
    font-size: 0.8rem;
}
.cpu-table th,
.cpu-table td {
    border: 1px solid #ccc;
    padding: 0.2rem 0.4rem;
    white-space: nowrap;
}
.cpu-table th {
    font-weight: bold;
}
.cpu-grid {
    display: grid;
    grid-template-columns: repeat(6, 32px);
    gap: 2px;
}
.cpu-cell.highlighted,
.cpu-table td.highlighted {
    background-color: #f0e68c;
    color:var(--vp-c-text-3);
}
.cpu-cell {
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 32px;
    height: 32px;
    overflow: hidden;
    font-size: 0.8rem;
}
</style>
