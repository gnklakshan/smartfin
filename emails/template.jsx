import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/components";

export default function EmailTemplate({ userName = "", type = "", data = {} }) {
  if (type !== "budget-alert") return null;

  return (
    <Html>
      <Head />
      <Preview>{`You've used ${data.percentage.toFixed(
        1
      )}% of your monthly budget`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Heading as="h2" style={styles.heading}>
              Budget Usage Alert
            </Heading>
            <Text style={styles.subheading}>
              Stay in control of your finances
            </Text>
          </Section>

          <Section style={styles.content}>
            <Text style={styles.text}>
              Hi <strong>{userName}</strong>,
            </Text>
            <Text style={styles.text}>
              You've used <strong>{data.percentage.toFixed(1)}%</strong> of your
              monthly budget. Here’s a summary of your financial status:
            </Text>

            <Section style={styles.cardContainer}>
              <div style={styles.card}>
                <Text style={styles.cardLabel}>Total Budget</Text>
                <Text style={styles.cardValue}>
                  ${data.budgetAmount.toFixed(2)}
                </Text>
              </div>
              <div style={styles.card}>
                <Text style={styles.cardLabel}>Spent So Far</Text>
                <Text style={styles.cardValue}>
                  ${data.totalExpenses.toFixed(2)}
                </Text>
              </div>
              <div style={styles.card}>
                <Text style={styles.cardLabel}>Remaining</Text>
                <Text style={styles.cardValue}>
                  ${(data.budgetAmount - data.totalExpenses).toFixed(2)}
                </Text>
              </div>
            </Section>

            <Text style={styles.alert}>
              ⚠️ We recommend reviewing your spending habits for the rest of the
              month to stay on track.
            </Text>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Need help or have questions? Contact our support team anytime.
            </Text>
            <Text style={styles.signature}>— The SmartFin Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f5f7fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "40px 0",
  },
  container: {
    maxWidth: "620px",
    backgroundColor: "#ffffff",
    margin: "0 auto",
    borderRadius: "8px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
    overflow: "hidden",
  },
  header: {
    padding: "32px",
    textAlign: "center",
    backgroundColor: "#1f2937",
  },
  heading: {
    color: "#ffffff",
    fontSize: "24px",
    margin: "0",
  },
  subheading: {
    color: "#cbd5e0",
    fontSize: "14px",
    marginTop: "8px",
  },
  content: {
    padding: "32px",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: "16px",
    color: "#2d3748",
    margin: "16px 0",
  },
  cardContainer: {
    // display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
    gap: "12px",
    flexWrap: "wrap",
  },
  card: {
    flex: "1 1 30%",
    backgroundColor: "#f9fafb",
    padding: "16px",
    margin: "8px 0",
    borderRadius: "6px",
    textAlign: "center",
    border: "1px solid #e2e8f0",
  },
  cardLabel: {
    fontSize: "14px",
    color: "#718096",
    marginBottom: "4px",
  },
  cardValue: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1a202c",
  },
  alert: {
    marginTop: "32px",
    fontSize: "14px",
    color: "#d69e2e",
    backgroundColor: "#fffbea",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #fefcbf",
  },
  footer: {
    padding: "24px",
    backgroundColor: "#f9fafb",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "#718096",
    marginBottom: "6px",
  },
  signature: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#2d3748",
  },
};
