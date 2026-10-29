---
name: Civic Intelligence Platform
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#4b566a'
  on-tertiary: '#ffffff'
  tertiary-container: '#636e83'
  on-tertiary-container: '#ecf1ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  data-metric:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.02em
  data-tabular:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  gutter-desktop: 1rem
  gutter-mobile: 0.75rem
  margin-desktop: 1.5rem
  margin-mobile: 1rem
  sidebar-width: 16.25rem
  sidebar-collapsed-width: 4.25rem
---

## Brand & Style

This design system establishes a high-density, mission-critical command center aesthetic tailored for civic administration, municipal engineering, and urban telemetry. The platform balances authoritative public-sector governance with cutting-edge analytical velocity. 

The emotional tone evokes situational mastery, rigorous precision, and operational clarity under pressure. It rejects decorative bloat, prioritizing uninterrupted data scanning, rapid anomaly detection, and cross-departmental coordination. 

The aesthetic style merges Corporate / Modern precision with utilitarian command-console ergonomics:
- Deep slate navy structural surfaces for primary navigational and global controls anchor the eye and delineate operational modes.
- Pristine light gray work surfaces maximize chart contrast, text readability, and spatial density across dense metric grids and GIS mapping canvases.
- High-chroma telemetry tokens slice through neutral canvas layers to convey critical alerts instantly without triggering cognitive fatigue.

## Colors

The palette operates on an asymmetric dual-canvas paradigm: high-contrast dark navy surfaces for high-level spatial anchors (sidebars, console headers, operational drawers) paired with a high-density, ultra-clean neutral light gray canvas for analytical workspaces.

### Core Canvas & Structure
- **Global Light Canvas**: `#F8FAFC` (Slate-50) serves as the primary workbench background.
- **Card & Tile Surface**: `#FFFFFF` with `#E2E8F0` structural micro-borders.
- **Surface Muted / Hover**: `#F1F5F9` (Slate-100) for row hovers, subtle table heads, and input backgrounds.
- **Console Navy (Primary Shell)**: `#0F172A` (Slate-900) for navigation bars, global toolbars, and contextual command strips.
- **Console Navy Accent (Elevated Shell)**: `#1E293B` (Slate-800) for secondary navigation tiers, flyouts, and active sidebar items.
- **Border & Divider Neutral**: `#E2E8F0` (Slate-200) for 1px crisp separation; `#CBD5E1` (Slate-300) for interactive control boundaries.

### Brand Accent
- **Primary Royal Blue**: `#2563EB` (Blue-600) drives actionable controls, focus rings, selected states, and core system telemetry. Hover state advances to `#1D4ED8`.

### Civic Telemetry & Anomaly Mapping
Telemetry colors carry strictly codified semantic assignments:
- **Critical / Hazards (Potholes, Structural Damage)**: `#EF4444` (Red-500) | Surface tint: `#FEF2F2`
- **Congestion / Urgent Alerts (Traffic Chokepoints)**: `#F97316` (Orange-500) | Surface tint: `#FFF7ED`
- **Infrastructure Deficiencies (Signage, Lighting)**: `#F59E0B` (Amber-500) | Surface tint: `#FFFBEB`
- **Fleet & Systems Nominal (Transit, Active Bus Fleet)**: `#10B981` (Emerald-500) | Surface tint: `#ECFDF5`
- **Hydrological / Environmental (Waterlogging, Drainage)**: `#3B82F6` (Blue-500) | Surface tint: `#EFF6FF`
- **Violations & Incidents (Rash Driving, Surveillance Flags)**: `#A855F7` (Purple-500) | Surface tint: `#FAF5FF`

## Typography

Inter governs the typographic scale, prioritized for clean geometric rendering at ultra-small sizes and exceptional legibility across dense dashboard grids.

### Numerical Data & OpenType Rules
- Always enforce `font-feature-settings: "tnum" on, "cv05" on, "cv11" on` on tables, ticker strips, GIS coordinate reads, and metric headers. Tabular figures prevent layout shifting during real-time WebSocket data updates.
- Section metric calls and KPIs use `data-metric` with strict negative tracking (`-0.02em`) to maintain an authoritative, compact posture.

### Hierarchical Restraint
- Uppercase styling is strictly reserved for `label-sm` elements (e.g., telemetry status badges, column headers, map overlays) with a positive letter spacing of `0.04em` to optimize rapid legibility in high-stress operational views.
- Dense data tables standardize on `body-sm` and `data-tabular` to sustain high information density without sacrificing line-to-line clarity.

## Layout & Spacing

The layout adopts a multi-tier dashboard framework with high information density:

### Grid Architecture
- **Desktop (1440px+)**: Multi-column fluid work zone bounded by a fixed or collapsible navy control bar (`16.25rem` expanded, `4.25rem` collapsed). Main analytics canvas leverages a 12-column grid with compact `1rem` (16px) gutters to maximize viewport real estate for map tiles and stream tables.
- **Tablet (768px - 1439px)**: 8-column layout. The primary navigation shell collapses into an icon-only dock (`4.25rem`), giving priority to operational panels.
- **Mobile (< 768px)**: 4-column layout with `0.75rem` (12px) gutters and `1rem` margins. The navy console transforms into an off-canvas drawer accessed via a top administrative app bar.

### Spacing Philosophy
Spacing conforms to a disciplined 4px base step, skewed toward compact density. Standard component internal padding is set to `0.75rem` (12px) or `1rem` (16px) to ensure dashboards present actionable intelligence above the fold without scrolling.

## Elevation & Depth

Visual depth is achieved through low-contrast outlines coupled with soft, ultra-diffused drop shadows. The system avoids exaggerated skeuomorphic drop shadows, preserving an executive, surgical screen surface.

### Elevation Layers
- **Surface Base (Level 0)**: Background `#F8FAFC`. Zero elevation.
- **Card & Workspace Panels (Level 1)**: Solid white (`#FFFFFF`) with a mandatory 1px micro-border (`#E2E8F0`) and an ambient shadow: `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
- **Active / Hover State (Level 2)**: Interactive analytical cards rise subtly on hover: `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Flyouts, Dropdowns & Overlays (Level 3)**: Filters, popovers, and GIS context sheets use: `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)` with a solid `#CBD5E1` border.
- **Command Consoles & Modal Windows (Level 4)**: Centered critical incident modals use: `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.

### Dark Sidebar Elevation
Within the navy sidebar (`#0F172A`), elevation is flat. Depth is communicated strictly via tonal fills: hover states utilize `#1E293B`, and active indicator rails use `#2563EB` with crisp `#334155` divider lines.

## Shapes

The design system standardizes on a refined, disciplined corner radius that feels architectural and structural:

- **Primary Cards & Containers**: Set to a uniform `12px` (`0.75rem`) border radius. This softens technical density while maintaining sharp structural bounds.
- **Interactive Controls (Buttons, Form Inputs, Dropdowns)**: Set to `6px` (`0.375rem`) to ensure tight spatial efficiency and precision.
- **Status Chips & Telemetry Pills**: Fully rounded pill shapes (`9999px`) or compact `4px` tags to visually differentiate state tags from interactive form elements.
- **Micro Badges & Count Indicators**: `4px` radius for tabular and grid counter tags.

## Components

### Buttons
- **Primary**: Solid Royal Blue (`#2563EB`), text `#FFFFFF`, 6px radius, `font-weight: 500`. Hover: `#1D4ED8`. Active: `#1E40AF`. Focus ring: 2px offset with `#2563EB`.
- **Secondary / Console**: Navy shell variant using `#1E293B` text `#F8FAFC`, hovering to `#334155`. Light canvas variant uses white background, `#E2E8F0` micro-border, text `#0F172A`, hovering to `#F8FAFC`.
- **Destructive**: `#EF4444` background, `#FFFFFF` text. Hover: `#DC2626`.
- **Ghost / Tool**: Transparent background, text `#64748B`, hover background `#F1F5F9` with text `#0F172A`.

### Status Badges & Chips
- Designed for high-velocity scanning. Composed of an optional 6px circular telemetry indicator dot, uppercase label (`label-sm`), and a 10% tint background paired with a full-contrast border.
- **Critical (Potholes)**: `#FEF2F2` fill, `#EF4444` text, `#FCA5A5` 1px border.
- **Active Fleet (Buses)**: `#ECFDF5` fill, `#059669` text, `#6EE7B7` 1px border.
- **Hydrology (Waterlogging)**: `#EFF6FF` fill, `#2563EB` text, `#93C5FD` 1px border.

### Analytical Cards & Metric Tiles
- Background `#FFFFFF`, border `1px solid #E2E8F0`, border-radius `12px`, padding `1rem` to `1.25rem`.
- Header row contains an uppercase metric category label (`label-sm`), trailing time-range or status badge, followed by the large `data-metric` figure and a secondary micro-trend delta (e.g., "+4.2% vs last hr" in emerald or red).

### Data Tables
- Header: `#F8FAFC` background, text `#475569`, uppercase `label-sm`, `1px solid #E2E8F0` top/bottom borders.
- Rows: `#FFFFFF` default, alternating hover to `#F8FAFC`. Cell padding `0.625rem 1rem` for high density.
- Numeric and status columns must employ `font-variant-numeric: tabular-nums`.

### Inputs & Selectors
- Standard input height `36px`, border `1px solid #CBD5E1`, background `#FFFFFF`, border-radius `6px`.
- Text color `#0F172A`, placeholder color `#94A3B8`.
- Focus state: border color `#2563EB` with an ambient glow (`box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15)`).

### GIS Map Floating Overlays
- Floating map toolbars and incident filters adopt a semi-frosted executive treatment: `#FFFFFF` with `backdrop-filter: blur(8px)`, `1px solid #CBD5E1`, and `12px` border radius, anchored over the geospatial layer.