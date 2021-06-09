import { defineComponent, onMounted, watch } from '@vue/runtime-core';
import Chart from 'chart.js/auto';
import { Chart as ChartType } from 'chart.js';
import { ref } from 'vue';

const StockChart = defineComponent({
  props: {
    dataSets: {
      type: Array as () => Array<{
        data: number[];
        label: string;
        backgroundColor: string;
      }>,
      default: () => [],
    },
  },
  setup(props) {
    const chartCanvas = ref();
    const chart = ref<ChartType>();

    watch(
      () => props.dataSets,
      () => {
        if (chart.value) {
          renderChart();
        }
      }
    );

    function renderChart() {
      if (chart.value) {
        chart.value.destroy();
      }
      chart.value = new Chart(chartCanvas.value, {
        type: 'bar',
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: props.dataSets,
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      }) as ChartType;
    }
    onMounted(() => {
      renderChart();
    });

    return () => (
      <div class="canvas-container">
        <canvas
          id="line"
          style={{
            maxHeight: '320px !important',
          }}
          ref={chartCanvas}
        />
      </div>
    );
  },
});
export default StockChart;
