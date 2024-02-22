export const graph_options = {
  chart: {
    id: "my-graph", // Optional unique chart ID
    width: "100%", // Responsive chart width
    height: 320, // Fixed chart height
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  yaxis: {
    title: {
      text: "Sales (USD)",
    },
  },
  title: {
    text: "Monthly Sales",
  },
};
