<p align="center">
  <img src="assets/profile-banner.svg" alt="Chitender Kumar — Senior Cloud Architect. Architecture that holds up. Kubernetes, reliability, secure platforms." width="100%">
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/chitenderkumar/">LinkedIn</a> ·
  <a href="mailto:chitenderkumar.16@gmail.com">Email me</a> ·
  <a href="https://chitender.github.io/learn-k8s/">Explore learn-k8s</a> ·
  <a href="./PORTFOLIO.md">Portfolio website & setup</a>
</p>

## I build platforms that teams can trust.

I'm **Chitender Kumar**, a **Senior Cloud Architect at Innovaccer**, based in Delhi, India. I bring **10+ years in platform and SRE engineering** to Kubernetes, secure multi-tenant infrastructure, and production operations across **AWS, Azure, and Azure Government**.

My work spans the full lifecycle: architecture decisions, reusable infrastructure, migrations, observability, incident response, and the automation that makes the next incident less likely.

**Technical focus:** Cloud architecture · Staff / Principal platform engineering · SRE · AI-assisted operations

**Credentials:** Certified Kubernetes Administrator (CKA) · B.Tech, Computer Science, LDIET

### Selected impact

| Result | Engineering behind it |
| :--- | :--- |
| **30% less alert noise** | Reliability and postmortem improvements over 18 months |
| **37% higher throughput in an egress benchmark** | HAProxy TCP passthrough: 735 vs 534 RPS in HTTP mode |
| **Zero production outages during a CNI migration** | Legacy CNI → Cilium across EKS / AKS |
| **~45,000 incident Q&A pairs** | Historical knowledge corpus supporting an AI-assisted RCA workflow |

These are selected results from my published experience. Benchmark figures describe the measured workload; they are not universal performance guarantees.

## Work worth exploring

### Platform engineering & cloud architecture

| Project | What I worked on |
| :--- | :--- |
| **Enterprise data platform** | Shared and dedicated tenant architectures, control/data-plane separation, private connectivity, namespace guardrails, and infrastructure standardization |
| **KubeNightwatch** | Kubernetes operator enforcing time-window and change-freeze policies, integrated with Slack and Jira workflows |
| **LLM egress hub** | Centralized cross-cloud egress using HAProxy and private connectivity; benchmark-led proxy configuration |
| **Cilium migration & EKS capacity** | eBPF networking modernization, plus Karpenter Spot/On-Demand capacity, instance diversity, and disruption controls |
| **Tenant-aware telemetry** | Collector-level redaction, attribute allowlisting, tenant-aware ClickHouse patterns, and retention controls for regulated workloads |

### Reliability, observability & AI

| Project | What I worked on |
| :--- | :--- |
| **InfraInsights** | Unified infrastructure observability with Prometheus, Grafana, OpenTelemetry and CloudWatch; SLO dashboards, burn-rate alerts, linked playbooks, and AI-assisted investigation |
| **Aria** | LLM-powered incident assistant using historical Q&A, Qdrant, Ollama and AKS to surface root-cause hypotheses for engineer validation |
| **Data services reliability** | Kafka ISR/partition/consumer-lag investigation, Elasticsearch/OpenSearch operations, capacity planning, tuning, and codified runbooks |

Professional work is described at an architectural level; these entries do not imply that employer-owned source code is public.

### Building in public

<table>
<tr>
<td width="50%" valign="top">

#### ⎈ learn-k8s

**Make Kubernetes click.** Interactive lessons and simulations for beginners: scheduling, reconciliation, networking, configuration, and production scenarios.

[Launch the learning lab →](https://chitender.github.io/learn-k8s/) · [Source →](https://github.com/chitender/learn-k8s)

</td>
<td width="50%" valign="top">

#### ↗ MacroCut

**Product thinking beyond infrastructure.** A personal nutrition-planning app project exploring onboarding, goal-based meal planning, and daily user experience.

[Explore the project →](https://github.com/chitender/macrocut)

</td>
</tr>
</table>

## Experience

| Period | Role | Company |
| :--- | :--- | :--- |
| **Jul 2024–present** | Senior Cloud Architect | **Innovaccer** |
| **From Feb 2021 → 2024** | SRE engineering & leadership | **Innovaccer** |
| Feb 2020–Jan 2021 | SDE II — Platform Engineering | Atlan |
| Jun 2019–Feb 2020 | Senior DevOps Engineer | Delhivery |
| Aug 2017–Jul 2019 | Infrastructure Engineer | Innovaccer |
| Feb 2015–Aug 2017 | Solution Architect / Engineer Operations | Telenity |

## Technical range

| Domain | Tools & practices |
| :--- | :--- |
| **Cloud & Kubernetes** | AWS · Azure · Azure Government · EKS · AKS · Cilium · Karpenter · Helm · Operators |
| **Delivery & automation** | Terraform · Ansible · Argo CD · Jenkins · GitLab CI · GitHub Actions · Go · Python · Bash |
| **Observability** | Prometheus · Thanos · Grafana · OpenTelemetry · CloudWatch · ClickHouse |
| **Distributed systems** | Kafka / MSK · Elasticsearch / OpenSearch · Redis · PostgreSQL |
| **Networking & security** | HAProxy · Private connectivity · IPSec VPN · Network policy · Tenant isolation · Telemetry data controls |
| **Reliability** | SLOs / SLIs · Error budgets · Incident command · Postmortems · Chaos engineering · Cost-aware capacity |

## How I approach engineering

- **Design for failure.** Recovery paths and SLOs belong in the architecture conversation.
- **Automate the guardrails.** Use controllers, IaC and GitOps to make good defaults repeatable.
- **Measure the trade-off.** Bring cost, latency, isolation and operational effort into the same decision.
- **Build for the next engineer.** Make systems understandable through useful signals, clear runbooks and explicit decisions.

---

**Have a platform challenge or a senior technical opportunity?**

[Let's connect on LinkedIn](https://www.linkedin.com/in/chitenderkumar/) or [start a conversation by email](mailto:chitenderkumar.16@gmail.com).

<sub>This repository also contains an interactive portfolio: architecture explorer, project filters, case studies, light/dark themes, motion controls, and a printable recruiter brief. See <a href="./PORTFOLIO.md">setup and maintenance</a>.</sub>
