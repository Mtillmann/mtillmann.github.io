---
layout: doc
date: 2026-07-05
title: The XX5X CPU Artwork Project
description: Documenting my 775, 1156, 1155, 1150 CPU Artwork project
tags:
  - projects
  - intel
  - cpu
  - collection
  - artwork
  - 2000s
---

<div class="row thumbs" style="margin-bottom:1rem;">
    <c8y link class="col-12" public-id="xx5x/xx5x-mounted-1_tqybyz" thumbnail="t_large2"/>
</div>


<Title/>


After the [socket 5/socket 7 project](./intel-cpu-collection-the-socket-5-socket-7-project.md), I would have liked to do one with AMD K5 and K6 socket 5/socket 7 CPUs, but given their (assumed) market share of 10-15% during that era, there were virtually no socket 7 AMD CPUs available and it would have taken a lot of effort and more money than I was willing to spend to complete an AMD project.

While researching affordable and available sockets, I found out that CPUs of the first four Intel LGA-sockets ([LGA 775](https://en.wikipedia.org/wiki/LGA_775)
, [LGA 1156](https://en.wikipedia.org/wiki/LGA_1156)
, [LGA 1155](https://en.wikipedia.org/wiki/LGA_1155)
, [LGA 1150](https://en.wikipedia.org/wiki/LGA_1150)) for consumer desktops all share the same dimensions of 37.5x37.5mm.

<div class="row thumbs">
    <c8y link class="col-sm-6 col-md-3" public-id="xx5x-2/IMG_1028_guhqxm">775: wide lip, no tabs, small notch</c8y>
    <c8y link class="col-sm-6 col-md-3" public-id="xx5x-2/IMG_1021_zbk4m6">1156: small lip, tabs, large notch</c8y>
    <c8y link class="col-sm-6 col-md-3" public-id="xx5x-2/IMG_1019_jtfxeb">1155: small lip, tabs, small notch</c8y>
    <c8y link class="col-sm-6 col-md-3" public-id="xx5x-2/IMG_1023_vhvt9h">1150: small lip, tabs, no notch</c8y>
</div>

By pure chance, 8x37.5mm is exactly 300mm, just like my previous project! I needed 64 CPUs (8x8) instead of the previous 36 (6x6). I decided to buy 16 CPUs of each socket, each with a distinct nickel-plated IHS and substrate design.


## Design



<div class="row thumbs">
    <c8y link class="col-sm-4" public-id="xx5x-2/IMG_0995_dwlbjb">just the nickel-plating looking great</c8y>
    <c8y link class="col-sm-4" public-id="xx5x/top-view_w3hndg">top view of the finished piece</c8y>
    <c8y link class="col-sm-4" public-id="xx5x/top-view-with-pattern_fbqghf">Color overlay:<strong style="letter-spacing:-2px;font-weight:900;">
        <span style="color:#0f0">1155</span>,
        <span style="color:#00f">775</span>,
        <span style="color:#f00">1150</span>,
        <span style="color:#888">1156</span>
    </strong> 
    </c8y>
</div>

Deciding on the placement pattern was challenging. Going for a purely visual arrangement like I did with the other project was not an option because I wanted to do something that would take into account the fact that I had 16 of each type.

Since the heatspreaders are visually not really distinctive and the wear and tear on the nickel-plating varies wildly, geometric patterns using the different types did not give good results (stripes etc) or wouldn't work in any meaningful way with the number of CPUs available (concentric, spirals etc).

I finally decided on a Tetris-pattern where each element is made up of 4 blocks and for each CPU type there are 4 blocks. From a distance it looks rather noisy (just like any other pattern), but the Tetris elements express a nice conceptual layer.

## Mounting

<div class="row thumbs">
    <c8y link class="col-sm-6 col-md-3" public-id="xx5x-2/IMG_1050_lkbnvl">mounting parts</c8y>
    <c8y link class="col-sm-6 col-md-3" public-id="xx5x-2/IMG_1057_ms3xj4">assembled mount: bottom view</c8y>
    <c8y link class="col-sm-6 col-md-3" public-id="xx5x/mounting-detail_m2njm2">interlocking mounting braces</c8y>
    <c8y link class="col-sm-6 col-md-3" public-id="xx5x/bottom-smd_gubmqf">bottom view of the center SMDs</c8y>

</div>

Since the LGA-CPUs have no pins but _lands_ and those lands are not magnetic at all, I had to design a mounting system that adds as little extra footprint as possible to the CPUs but is also strong enough to let me pick up and rearrange the CPUs.

I decided on a three-part PLA construction with magnets inside the center-part and two braces that run below the center-part, across each other and fix the substrate to the center-part.

The braces use a tongue and groove design so they fit into each other, helping with alignment while also halving the gap between the CPUs.

The center-part has a round hole in the center to make room for the SMDs on the bottom of the substrate, and the cross-shaped cutout is deep enough to fit the braces and provide clearance for the alignment-grid that sits on the steel plate.

Even though I made the gaps as small as possible, the overall footprint had increased from 300x300mm to ~308x308mm, so the printed frame would need notches to accommodate the extra space and the braces.

The initial frame and alignment grid prototypes were printed in thermochromic PLA, which you can see in the detail photos above. Since the braces completely cover the grid, I decided to keep the prototypes and printed a frame that sits on top of the actual frame using the same matte grey PLA as the mounts.

## Used CPUs, Prices and Performance Stats

<div class="row thumbs">
    <figure class="col-sm-12">
        <a target="_blank" href="/resources/xx5x-perf-chart.html">
        <img src="/resources/xx5x-perf-chart.png?url">
        </a>
        <figcaption>Illustrating TDP vs perf over time. click for interactive version</figcaption>
    </figure>
</div>


| Quantity | Socket | Model | Release | perf abs<sup><a href="#perfinfo">1</a></sup> | perf rel | TDP | MSRP<sup><a href="#priceinfo">2</a></sup> | MSRP ∑ | ∑ + inflation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | 
| 1 | 775 | Pentium 4 HT 540J | Oct 2004 | ~7.5 | 15% | 84W | $278 | $278 | $488 |
| 1 | 775 | Core 2 Duo E6600 | July 2006 | 15.8 | 32% | 65W | $316 | $316 | $520 |
| 3 | 775 | Pentium DC E2160 | Jun 2007 | ~13.5 | 27% | 65W | $84 | $252 | $405 |
| 6 | 775 | Pentium DC E2180 | Aug 2007 | ~14.2 | 28% | 65W | $84 | $504 | $812 |
| 2 | 775 | Core 2 Duo E8400 | Jan 2008 | 24.2 | 49% | 65W | $316 | $632 | $1003 |
| 1 | 775 | Celeron E3300 | Aug 2009 | ~16.5 | 33% | 65W | $43 | $43 | $67 |
| 2 | 775 | Pentium E5500 | April 2010 | ~18.5 | 37% | 65W | $75 | $150 | $230 |
| 1 | 1156 | Core i5-750 | Sep 2009 | ~32.6 | 65% | 95W | $196 | $196 | $304 |
| 5 | 1156 | Core i3-540 | Jan 2010 | 27.8 | 56% | 73W | $133 | $665 | $1028 |
| 7 | 1156 | Core i3-530 | Jan 2010 | 26.9 | 54% | 73W | $113 | $791 | $1223 |
| 2 | 1156 | Core i5-650 | Jan 2010 | 30.7 | 62% | 73W | $176 | $352 | $555 |
| 1 | 1156 | Core i3-550 | May 2010 | 29.6 | 59% | 73W | $138 | $138 | $211 |
| 6 | 1155 | Core i3-2120 | Feb 2011 | 36.9 | 74% | 65W | $138 | $828 | $1254 |
| 4 | 1155 | Pentium G620 | May 2011 | 30.5 | 61% | 65W | $74 | $296 | $439 |
| 1 | 1155 | Core i5-3470s | Jun 2012 | 45.7 | 92% | 65W | $184 | $184 | $269 |
| 1 | 1155 | Core i5-3330 | Sep 2012 | 42 | 84% | 77W | $182 | $182 | $264 |
| 1 | 1155 | Core i3-3245 | Jun 2013 | 41.2 | 83% | 55W | $134 | $134 | $192 |
| 3 | 1155 | Pentium G2030 | Jun 2013 | 37 | 74% | 55W | $50 | $150 | $214 |
| 1 | 1150 | Pentium G3220 | Sep 2013 | 40 | 80% | 53W | $71 | $71 | $101 |
| 3 | 1150 | Core i3-4130 | Sep 2013 | 48.7 | 98% | 54W | $122 | $366 | $524 |
| 10 | 1150 | Celeron G1820 | Jan 2014 | 36.6 | 73% | 53W | $42 | $420 | $602 |
| 1 | 1150 | Pentium G3250 | Jul 2014 | *42.6 | 85% | 53W | $71 | $71 | $100 | 
| 1 | 1150 | Core i3-4170 | Mar 2015 | *49.9 | **100%** | 54W | $117 | $117 | $166 |

The total price of all 64 CPUs at launch was $7,163.00, which is $10,971.00 when adjusted for inflation. Quite the difference compared to the ~$30k launch price of the 36 CPUs of the other project. However, almost all of the above CPUs are low-end or mid-range at best, while the 90s Pentiums were all considered to be high-end.

The SPECint2006 baseline-values give a good sense of how performance has progressed across the collection from the weak but power-hungry P4 HT 540J to the much better i3-4170.

For reference, the i3-4170's most powerful contemporary, the i7-4790K, has a baseline value of 65.2, which is ~30% higher. Real-world performance difference was likely higher than 30%, especially on multi-core workloads.

When comparing the i3-4170's performance to the modern i9-14900KS on single thread MOps/s, the i9 is ~2.4× faster: [2,027 for the i3-4170](https://www.cpubenchmark.net/cpu.php?cpu=Intel+Core+i3-4170+%40+3.70GHz&id=2522#:~:text=Million%20Matrices/Sec-,Single%20Thread,-2%2C027%20MOps/Sec) vs [4,813 for the i9-14900KS](https://www.cpubenchmark.net/cpu.php?id=5957&cpu=Intel+Core+i9-14900KS#:~:text=Million%20Matrices/Sec-,Single%20Thread,-4%2C813%20MOps/Sec).




## Acquiring the CPUs



I started on Kleinanzeigen, where I got some socket 775 and socket 1156 CPUs (and socket 1366 Xeons) for free or at reasonable prices. Still, I was looking at ~5€/CPU incl. shipping, ~320€ in total only for the CPUs. 

Luckily, I found out that you can buy older used CPUs in bulk on eBay. I ended up spending ~1.80€/CPU incl. shipping on the final ~50 CPUs.

The total spend was ~30€ for those I got from Kleinanzeigen and ~90€ for those I ordered from eBay.

Fun fact: all my eBay orders contained 1-2 CPUs more than what I ordered and some different models. Thankfully, they were all for the sockets I needed and it enabled me to not use CPUs like the cursed and punished 775 pictured below.


## Final Thoughts

<div class="row thumbs">
    <c8y link class="col-sm-6" public-id="xx5x/cursed-775_wtvh2a">unidentifiable 775 CPU: The copper shines through the sliced nickel</c8y>
    <c8y link class="col-sm-6" public-id="xx5x/1366vs775_vugtmo">Socket 1366 Xeon next to small 775</c8y>
</div>


I am very pleased with how this turned out! The nickel plating looks great and building it was a fun challenge. 

The project made me aware of Intel's decision to change socket design every few years and rob users of an upgrade path. Except for a 1150-build (i5-4670K) in 2014, I've only had AMD builds since the late 1990s, so I never really bothered to look into Intel's socket policy before.

I will not be building another of those, since 1151-CPUs basically look the same and newer CPUs are not square and would be pretty expensive.

## Footnotes

<sup id="perfinfo">1</sup> Performance metric used is [SPECint2006](https://www.spec.org/cgi-bin/osgresults?conf=cpu2006&op=fetch&field=COMPANY&pattern=intel). ~ = estimated, * = taken from similar CPU

<sup id="priceinfo">2</sup> Prices, Release Date, TDP from wikipedia: [core](https://en.wikipedia.org/wiki/List_of_Intel_Core_processors), [celeron](https://en.wikipedia.org/wiki/List_of_Intel_Celeron_processors), [pentium](https://en.wikipedia.org/wiki/List_of_Intel_Pentium_processors). extra price sources: [G620](https://www.legitreviews.com/intel-pentium-g620-sandy-bridge-2-6ghz-cpu-review_1665#:~:text=This%20processor%20has%20a%20tray%20price%20of%20just%20%2464.00%20with%20an%20actual%20street%20price%20of%20%2473.87%20shipped),
[G2030](https://www.cpu-monkey.com/en/cpu-intel_pentium_g2030#:~:text=Q2/2013-,Release%20price,-50%20%24),
[G3220](https://www.cpu-monkey.com/en/cpu-intel_pentium_g3220#:~:text=Q3/2013-,Release%20price,-54%20%24),
[E5500](https://www.cpu-world.com/CPUs/Pentium_Dual-Core/Intel-Pentium%20Dual-Core%20E5500%20AT80571PG0722ML%20(BX80571E5500%20-%20BXC80571E5500).html#:~:text=Price%20at%20introduction),
[E2160/E2180](https://www.techpowerup.com/cpu-specs/pentium-dual-core-e2160.c473#:~:text=Jun%203rd%2C%202007-,Launch%20Price%3A,-%2484),
[G3220/G3250](https://technical.city/en/cpu/Pentium-G3220#:~:text=2013%20at%20a-,recommended%20price,-of%20%2471.%20This)
