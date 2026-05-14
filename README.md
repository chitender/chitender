```
~/career/ — chitender@platform-eng — zsh — 132×40                          ⎈ ● k8s-prod-2026
```

# Chitender_Kumar_

> **Senior Cloud Architect · Platform & SRE Engineering**
> `#kubernetes` `#sre` `#ebpf` `#finops` `#ai-ops` `#observability`

---

```yaml
email    : chitenderkumar.16@gmail.com
phone    : +91 8130 089 176
linkedin : linkedin.com/in/chitenderkumar
location : Delhi, India · open to remote
cert     : CKA / CNCF
seeking  : Staff / Principal / SRE Manager
```

---

## $ summary --short

Senior Cloud Architect and SRE leader with **10+ years** delivering production-grade Kubernetes platforms on **AWS EKS** and **Azure AKS** at scale. Specializes in reliability engineering (SLO/SLI/error budgets), cost-optimized compute, and automation-first operations.

Track record of shipping internal platforms — including an **AI-assisted incident response system** (Aria/InfraInsights), **eBPF-based CNI migration** (Cilium), and **Karpenter-driven FinOps programs** — that measurably reduce MTTR, alert noise, and operational toil.

| Metric | Value | Context |
|--------|-------|---------|
| 🕐 Years in production | **10+** | Platform & SRE |
| ⚡ RCA surface time | **< 2 min** | Aria AI assistant |
| 📉 Alert noise reduction | **−30%** | Over 18 months |
| 🧠 Incident pairs trained | **45K** | RAG corpus |

---

## $ kubectl get experience -o wide

### ▸ Senior Cloud Architect @ [Innovaccer](https://innovaccer.com) · `Jul 2024 — Present`

> Lead platform engineering & SRE for a healthcare data activation platform running thousands of Kubernetes workloads across EKS and AKS.

| Domain | Project | Impact |
|--------|---------|--------|
| `[networking]` | **Cilium CNI migration on EKS/AKS** — Led end-to-end migration from legacy CNI to Cilium (eBPF). Enforced L4/L7 policy, improved network observability, reduced connection-level latency | Zero production outages during cutover |
| `[finops]` | **Karpenter program at scale** — Spot/On-Demand mix, instance diversity, disruption windows. Right-sized node pools via load testing | Cut compute cost while holding P99 within SLO during peak |
| `[ai-ops]` | **Aria — AI-assisted incident response** — LLM-powered RCA assistant (Gemma 4 + Qdrant + Ollama on AKS), trained on ~45K historical incident Q&A pairs | Surfaces root causes in < 2 min inside on-call workflows |
| `[governance]` | **Multi-account lifecycle tooling** — Python + Kubernetes API tooling for cross-account operations using AWS STS | Reduced manual provisioning overhead; enforced security guardrails at scale |

---

### ▸ Lead SRE → SRE Manager → Staff SRE @ [Innovaccer](https://innovaccer.com) · `Feb 2021 — Sep 2024`

> Built and led the SRE function from IC to team lead. Owned availability, incident command, and measurable reliability improvements across critical services.

| Domain | Project | Impact |
|--------|---------|--------|
| `[observability]` | **InfraInsights platform** — Full-stack observability + AI-RCA platform (Prometheus / Grafana / OTel / CloudWatch) with SLO dashboards, burn-rate alerts, and auto-linked playbooks | Replaced fragmented monitoring with a single pane of glass |
| `[controllers]` | **KubeNightwatch operator** — Production K8s controller enforcing time-window and change-freeze policies; Slack + Jira integration; deletes out-of-policy resources | Eliminated an entire class of unauthorized change incidents |
| `[data]` | **Kafka & OpenSearch reliability** — ISR instability, partition skew, GC-related consumer lag via tuning, scaling patterns, and codified runbooks | Significant drop in repeat Kafka incident volume |
| `[chaos]` | **Chaos engineering practice** — Spot interruption drills and failover chaos tests | Exposed hidden single points of failure before they became incidents |
| `[platform]` | **Postmortem culture** — Drove postmortems to time-bound, code-level fixes | Reduced noisy pages > 30% over 18 months; materially improved MTTR |

---

### ▸ Earlier Roles

| Company | Role | Period |
|---------|------|--------|
| **Atlan** | SDE II — Platform Engineering | Feb 2020 — Jan 2021 |
| **Delhivery** | Senior DevOps Engineer | Jun 2019 — Feb 2020 |
| **Innovaccer** | Infrastructure Engineer | Aug 2017 — Jul 2019 |
| **Telenity** | Solution Architect / Engineer Operations | Feb 2015 — Aug 2017 |

---

## $ ls ./signature-projects/

<table>
<tr>
<td width="50%">

### 🤖 Aria · `AI INCIDENT ASSISTANT`

LLM-powered RCA system (Gemma 4 + Qdrant + Ollama on AKS), trained on ~45K Q&A pairs from historical incidents.

Surfaces root-cause hypotheses in **< 2 min**, integrated into on-call tooling.

`Gemma4` `Qdrant` `Ollama` `AKS` `RAG`

</td>
<td width="50%">

### 📊 InfraInsights · `OBSERVABILITY PLATFORM`

Prometheus / Grafana / OTel / CloudWatch unified observability with SLO dashboards, burn-rate alerts, and auto-linked runbooks.

Replaced fragmented monitoring across multi-tenant EKS/AKS.

`Prometheus` `Grafana` `OTel` `CloudWatch` `SLO`

</td>
</tr>
<tr>
<td width="50%">

### 🔒 KubeNightwatch · `CHANGE-FREEZE OPERATOR`

Kubernetes operator enforcing time-window and change-freeze policies; deletes out-of-policy resources; Slack/Jira integration.

Eliminated unauthorized change incidents entirely.

`Go` `Kubernetes Operator` `Slack` `Jira`

</td>
<td width="50%">

### 💰 Karpenter at Scale · `FINOPS AUTOSCALING`

Workload-aware Spot/On-Demand autoscaling with instance diversity, disruption windows, and forecast-based pre-warm for batch workloads.

Cut compute cost while sustaining P99 SLOs.

`Karpenter` `Spot` `EKS` `AKS` `FinOps`

</td>
</tr>
</table>

---

## $ env | grep STACK

```bash
KUBERNETES_CLOUD  = "EKS, AKS, GKE, Karpenter, Cilium (eBPF), Helm, Argo CD, Flux, Operators, KEDA"
CLOUD_PLATFORMS   = "AWS (EKS, STS, EC2, RDS, S3, CloudWatch, IAM), Azure (AKS, Monitor), GCP"
OBSERVABILITY     = "Prometheus, Grafana, OpenTelemetry, Alertmanager, CloudWatch, Jaeger, Loki"
IAC_AUTOMATION    = "Terraform, Ansible, Python, Go, Bash, Jenkins, GitLab CI, GitHub Actions"
DATA_MESSAGING    = "Kafka, OpenSearch / Elasticsearch, Redis, PostgreSQL, Qdrant (vector DB)"
AI_ML_OPS         = "LLM integration (Gemma 4, Ollama), RAG pipelines, vector embedding, AI-assisted RCA"
RELIABILITY       = "SLO/SLI/Error Budgets, Incident Command, Chaos Engineering, DORA Metrics, Postmortems"
```

---

## $ cat ./credentials.txt

```
✓  Certified Kubernetes Administrator (CKA) — CNCF
✓  B.Tech, Computer Science — LDIET, 2016
```

---

## $ git log --oneline --graph (what I'm working on)

```
* feat(ai-ops):     Aria v2 — multi-cluster incident correlation
* feat(finops):     Karpenter forecast-based pre-warm for batch windows
* feat(ebpf):       Cilium Hubble flows → OTel pipeline
* chore(platform):  Multi-tenant control/data plane IaC standardization
```

---

<div align="center">

**`K8S · EBPF · OTEL · KARPENTER · KAFKA · TERRAFORM · GO · PYTHON · LLM-OPS`**

```
chitender@platform:~ $ exit 0   # thanks for reading — ck / 2026
```

[![LinkedIn](https://img.shields.io/badge/LinkedIn-chitenderkumar-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/chitenderkumar)
[![Email](https://img.shields.io/badge/Email-chitenderkumar.16%40gmail.com-EA4335?style=flat&logo=gmail)](mailto:chitenderkumar.16@gmail.com)
[![CKA](https://img.shields.io/badge/CKA-Certified%20Kubernetes%20Administrator-326CE5?style=flat&logo=kubernetes)](https://www.cncf.io/certification/cka/)

</div>
