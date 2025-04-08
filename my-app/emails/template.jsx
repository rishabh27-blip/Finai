import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function EmailTemplate({
  userName = "",
  type = "monthly-report",
  data = {},
}) {
  const totalIncome = data?.stats?.totalIncome ?? "N/A";
  const totalExpenses = data?.stats?.totalExpenses ?? "N/A";
  const netIncome =
    typeof totalIncome === "number" && typeof totalExpenses === "number"
      ? totalIncome - totalExpenses
      : "N/A";

  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report 🎉</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>📊 Monthly Financial Report</Heading>

            <Text style={styles.text}>Hello {userName} 👋,</Text>
            <Text style={styles.text}>
              Here’s your financial summary for <b>{data?.month ?? "this month"}</b>:
            </Text>

            {/* Main Stats */}
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.label}>💰 Total Income</Text>
                <Text style={styles.amount}>${totalIncome}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.label}>💸 Total Expenses</Text>
                <Text style={styles.amount}>${totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.label}>🔄 Net</Text>
                <Text style={styles.amount}>
                  ${netIncome}
                </Text>
              </div>
            </Section>

            {/* Category Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.subheading}>📂 Expenses by Category</Heading>
                {Object.entries(data.stats.byCategory).map(
                  ([category, amount]) => (
                    <div key={category} style={styles.row}>
                      <Text style={styles.text}>{category}</Text>
                      <Text style={styles.text}>${amount ?? "N/A"}</Text>
                    </div>
                  )
                )}
              </Section>
            )}

            {/* AI Insights */}
            {data?.insights?.length > 0 && (
              <Section style={styles.section}>
                <Heading style={styles.subheading}>💡 Finai Insights</Heading>
                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              🚀 Stay on top of your finances with Finai! Happy saving! 🎉
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  return null; // Default return if type doesn't match
}

const styles = {
  body: {
    background: "linear-gradient(135deg, #6EE7B7, #3B82F6)", // Energetic Gradient
    fontFamily: "'Inter', sans-serif",
    color: "#fff",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
    maxWidth: "600px",
  },
  title: {
    color: "#1E40AF",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  subheading: {
    color: "#1E3A8A",
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  text: {
    color: "#374151",
    fontSize: "16px",
    marginBottom: "16px",
  },
  section: {
    marginTop: "20px",
    padding: "16px",
    background: "rgba(255,255,255,0.8)",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
  },
  statsContainer: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
  },
  stat: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.07)",
    textAlign: "center",
  },
  label: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#1E40AF",
  },
  amount: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#059669",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #E5E7EB",
  },
  footer: {
    color: "#6B7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "24px",
    paddingTop: "16px",
    borderTop: "1px solid #E5E7EB",
  },
};
