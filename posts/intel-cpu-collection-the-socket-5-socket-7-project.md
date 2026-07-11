---
layout: doc
date: 2026-07-04
title: The socket 5 / socket 7 CPU Artwork project
description: Documenting my socket 5 / socket 7 CPU Artwork project
tags:
  - projects
  - intel
  - cpu
  - collection
  - artwork
  - retro
  - 90s
---

<div class="row thumbs" style="margin-bottom:1rem;">
    <c8y link class="col-12" public-id="s5s7/s5s7-header_or43fi" thumbnail="t_large2"/>

</div>


<Title/>


<div class="row thumbs">
    <c8y link class="col-sm-6" public-id="s5s7-2/IMG_0999_lkkia2">
        standing up
    </c8y>
    <c8y link class="col-sm-6" public-id="s5s7/top-view_xm9wrk">
        top view
    </c8y>
</div>


Over the past years, I collected 36 socket 5 / socket 7 Intel CPUs with beautiful [alumina](https://en.wikipedia.org/wiki/Aluminium_oxide) lids. This post documents the artwork and answers all the questions I had about the CPUs during and after the build. 

## Design

The CPUs are sorted by hue and lightness to create a diagonal gradient from top left to bottom right on the steel plate. I tried other patterns but I felt this one was the most appealing. Arranging by age, core frequency, plant etc did not give good results. The interactive chart above lets you explore how the CPUs are placed in the current design.

<a href="/resources/s5s7-pentiums.html" target="_blank">Interactive design visualization here!</a>


## Mounting


<div class="row thumbs">
    <c8y link class="col-sm-6 col-md-4" public-id="s5s7-2/IMG_1037_aaipkp">
        alignment grid and magnet guide
    </c8y>
    <c8y link class="col-sm-6 col-md-4" public-id="s5s7-2/IMG_1039_gixlou">
        grid uncovered
    </c8y>
    <c8y link class="col-sm-6 col-md-4" public-id="s5s7/magnet-view_tl0mhu">
        magnets shining through the alumina
    </c8y>
</div>


The approximate ceramic lid size of 49.5x49.5mm perfectly fits 6x6 on a 300x300mm steel plate. Attaching the CPUs was a no-brainer as well: magnets work great because the old CPU pins are made of gold-plated [kovar](https://en.wikipedia.org/wiki/Kovar), which is magnetic

I printed the frame from four corner-parts in white PETG that fit the plate perfectly. The frame components are glued using small printed inlay joints. Inside the frame the alignment grid is also printed from white PETG and visible between the 

## Original Cost at Launch

| Quantity | Clock Speed | Release | S-Spec | MSRP | MSRP Sum | 
| --- | --- | --- | --- | --- | --- |
| 13 | 75 MHz | October 1994 | SX969 | $800 <sup><a href="#p75price">1</a></sup> | $10,400 |
| 2 | 90 MHz | March 1994 | SX968 | $849 <sup><a href="#p90p100price">2</a></sup> | $1,698 |
| 2 | 100 MHz | March 1994 | SX963 | $995 | $1,990 |
| 3 | 100 MHz | March 1994 | SY007 | $995 | $2,985 |
| 1 | 100 MHz | March 1994 | SX970 | $995 | $995 |
| 2 | 133 MHz | June 1995 | SK106J | $935 <sup><a href="#p133price">3</a></sup> | $1,870 |
| 7 | 133 MHz | June 1995 | SY022 | $935 | $6,545 |
| 1 | 133 MHz | June 1995 | SY028 | $935 | $935 |
| 4 | 166 MHz | January 1996 | SL27K | $749 <sup><a href="#p166price">4</a></sup> | $2,996 |
| 1 | 166 MHz | January 1996 | SY016 | $749 | $749 |


If the prices are correct, the MSRP of all CPUs would be **$31,163** at launch, which is almost **$70,000** when taking [inflation](https://data.bls.gov/cgi-bin/cpicalc.pl?cost1=31%2C163.00&year1=199506&year2=202604) into account.

The prices I used are for orders of at least 1,000 units, so the street prices may have been even higher at the time of release.

## Performance Compared to Modern CPUs

<div class="row thumbs">
    <c8y link class="col-sm-6 col-md-4" public-id="s5s7-2/IMG_1041_cz5mzg">
    </c8y>
    <c8y link class="col-sm-6 col-md-4" public-id="s5s7-2/IMG_1030_rnrdf3">
    </c8y>
    <c8y link class="col-sm-6 col-md-4" public-id="s5s7-2/IMG_1010_uaastr">
    </c8y>
</div>


| CPU | QTY | MIPS / UNIT | MIPS SUM | TDP | TDP SUM | Process | Transistors |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P75 | 13 | 18.9 | 245.7 | 8W | 104W | 600NM | 3.2M<sup><a href="#transistorcount">8</a></sup> |
| P90 | 2 | 27<sup><a href="#p90mips">5</a></sup> | 54 | 9W | 18W | 600NM | 3.2M |
| P100 | 6 | 32.2 | 193.2 | 10.1W | 60.6W | 600NM | 3.2M |
| P133 | 10 | 39 | 390 | 11.2W | 112W | 350NM | 3.3M |
| P166 | 5 | 43.9 | 219.5 | 14.5W | 72.5W | 350NM | 3.3M |
| `i7-3930K x1` | 1 | 2432 | 2432 | 50W | 50W | 32NM | 2,270M |
| `i7-3930K x6` <sup><a href="#multicore">6</a></sup> | 1 | 14592 | 14592 | 130W | 130W |  32NM | 2,270M |
| `i9-14900KS x1` <sup><a href="#i914900KS">7</a></sup> | 1 | 4037 | 4037 | 60W | 60W | 7/10NM | ~15,000M |
| `i9-14900KS x8` | 1 | 32296 | 32296 | 253W | 253W | 7/10NM | ~15,000M |

Comparing the CPUs to modern systems is tricky. MIPS has been a meaningless metric for a long time, but I have nothing better: [this page](http://www.roylongbottom.org.uk/dhrystone%20results.htm) has data comparing my CPUs to a rather new CPU (i7-3930K) using the same Dhrystone benchmark. I will pick the `Dhry2 NoOpt VAX Mips` value for comparison, which - according to my LLM - is the best value of the bunch.

The i9-14900KS values are calculated based on the i7-3930K values to show how an even newer CPU might compare.

Comparing the total MIPS of my Pentiums, **1102.4**, to the 2432 MIPS for a single core of the [i7-3930K](https://www.intel.com/content/www/us/en/products/sku/63697/intel-core-i73930k-processor-12m-cache-up-to-3-80-ghz/specifications.html) from 2011 shows that all 36 CPUs together would deliver ~45% of what a single core of the newer CPU would produce. 

Taking all of the six i7-3930K cores into account, all Pentiums together deliver only 7.55% of the performance of the i7-3930K.

When comparing to the i9-14900KS, it looks even worse: All Pentiums deliver 27.31% of a single core and only 3.41% of the performance the 8 performance cores potentially deliver.

The [power consumption](https://en.wikipedia.org/wiki/List_of_Intel_Pentium_processors#%22P54C%22_(600_nm)) would look similar: the i7-3930K has a TDP of 130W, so I guess it would take at most 50W during a single-core benchmark and the full 130W for a multi-core benchmark. All of the Pentiums combined (would probably) use around 365W to deliver their 1102.4 MIPS.

The performance-per-watt gap is even worse than the raw MIPS numbers suggest. All 36 Pentiums combined consume ~365W to deliver 1102.4 MIPS, roughly 0.33W per MIPS.

A single i7-3930K core achieves 2432 MIPS at ~50W (i9-14900KS: 4037 MIPS at ~60W), or ~0.021W per MIPS (i9-14900KS: ~0.015W per MIPS), making the i7-3930K 16 times more power-efficient per MIPS on a single core (i9-14900KS: ~22 times). 

At full multi-core load, the Pentiums deliver only 7.55% of the i7-3930K's 6-core output (i9-14900KS 8-core: 3.41%) at 365W versus 130W (i9-14900KS: 253W): 181% more power draw (i9-14900KS: 44% more) for a fraction of the performance. 

The i7-3930K is 37 times as efficient per MIPS under full load, while the i9-14900KS reaches 42 times.

## What about the ✨_GOLD_✨

<div class="row thumbs centered">
    <c8y link class="col-sm-6" public-id="s5s7/straight-pins_ejgqwb">
        gold-plated kovar pins in good condition
    </c8y>
    <c8y link class="col-sm-6" public-id="s5s7/chipped-alumina_hpkhvi">
        chipped corner shows the alumina layers
    </c8y>
</div>

According to [this post](https://electronics.alibaba.com/buyingguides/gold-in-cpus-how-much-is-really-there#:~:text=1.5%20kg%20of%20mixed%20vintage%20ceramic%20CPUs), 1.5kg of _vintage ceramic CPUs_ contain 2.1-2.9g of gold, so my ~1kg of CPUs should contain **1.4–1.93g** of pure _GOLD_.

> Current price for the assumed gold content of 1.75g (0.0563 ounces) [in Euro](https://www.xe.com/currencyconverter/convert/?Amount=0.0563&From=XAU&To=EUR), [In USD](https://www.xe.com/currencyconverter/convert/?Amount=0.0563&From=XAU&To=USD)

Getting the gold is not free, as the linked post explains in great detail. 

## Acquiring the CPUs

During my civilian service, I threw out a lot of Desktop PCs with (then already obsolete) Socket 5/Socket 7 CPUs. Since I really like the color and texture of the ceramic lids, I started collecting the CPUs and had about 20 when I finished the service. 

Over the years, I kept adding to the collection, and in 2025, I finally decided to start this project.

The biggest issue was buying the last few CPUs on the Kleinanzeigen platform because people are delusional ("_i know what i got_") about what a 30+ years old, [(probably) buggy](https://en.wikipedia.org/wiki/Pentium_FDIV_bug#Affected_models), and fully compatible x86-CPU is worth. 

> My 100% correct opinion: **<3€ including shipping!**

In the end, this is what I spent on the project:

- ~18 vintage Pentiums at ~11€ a piece: ~200€
- steel plate: 10€
- magnets: 10€

**~220€** in total. Some Pentiums were too dirty or broken, so I needed to buy more than I initially expected.


## Do They Deserve Better?

I asked myself if I am greedy to hoard the CPUs and not resell/gift them to people who "need" them: In my opinion, there is absolutely no reason to run an extremely inefficient (see above) 90s processor when basically every binary from the period runs on any modern x86-CPU or can be emulated more efficiently (native 16-bit). The OS would likely be more of an issue and has been since the mid-2000s. 

As written above, the CPUs were considered trash ~25 years ago, so there was plenty of time to migrate to more recent platforms. Replacing dying 30+ year old hardware with equally old hardware is not a winning strategy either, so there is really no practical use for those processors.

Enthusiast retro-builds seem to prefer high-end components from the era like P200, P233, or AMD K6 CPUs, if they bother with basic socket 7 at all. 


## Final Thoughts

<div class="row thumbs">
    <c8y link class="col-sm-6 col-md-4" public-id="s5s7/leftovers_me6gik">
        the leftover pile
    </c8y>
    <c8y link class="col-sm-6 col-md-4" public-id="s5s7/permanently-marked_o6mrwp">
        permanently marked
    </c8y>
    <c8y link class="col-sm-6 col-md-4" public-id="s5s7/glue-damage_bkcjbl">
        ugly glue residue
    </c8y>
</div>


I am very pleased with the project and the result. While I am absolutely not into vintage hardware or (almost) any hardware at all, the 90s Pentium era reminds me of the wild time when you got HUGE performance jumps year after year, ripped game CDs, hardware that went obsolete FAST, swapping parts with friends, 3D accelerators, and just so many new games and software basically every month.

The subtle differences in color of the ceramic lids and the wear and tear make it look really interesting to me. I like to imagine that the color differences are from workers dropping cigarette ashes into the mixer that prepares the ceramic slurry while cracking jokes.

Writing this post has probably taken more time than actually planning and building the project, but it was also very interesting to learn about how far we've come regarding performance and power-consumption.

Also check the follow-up project: [the xx5x project](./intel-cpu-collection-the-xx5x-project.md)

## Footnotes

<sup id="p75price">1</sup> P75 price: I can't find a definitive answer on what the MSRP was when [Intel released the CPU](https://web.archive.org/web/20100119181212/http://processortimeline.info/proc1994.htm#:~:text=Intel%20introduces%20the%2075%20MHz%20Pentium%20processor%2C). Based on the others, I guess it was around $800.

<sup id="p90p100price">2</sup> P90/P100 price: Taken from the prices quoted [here](https://web.archive.org/web/20120113012811/http://processortimeline.info/proc1994.htm#:~:text=The%2060/90%20MHz%20Pentium). 735 and 815 are the [ICOMP 1.0](https://en.wikipedia.org/wiki/ICOMP_(index)) ratings of the respective CPUs.


<sup id="p133price">3</sup> P133 price: [see](https://web.archive.org/web/20120113012813/http://processortimeline.info/proc1995.htm#:~:text=Intel%20announces%20the%20immediate%20availability%20of%20the%20133%20MHz%20Pentium%20processor)

<sup id="p166price">4</sup> P166 price: [stated here](https://web.archive.org/web/20120113012816/http://processortimeline.info/proc1996.htm#:~:text=Intel%20announces%20the%20immediate%20availability). Interesting how the flagship price went down by almost 20% in the 6 months between launches.

<sup id="p90mips">5</sup> P90 MIPS: I guessed the number since the CPU is missing from the chart.

<sup id="multicore">6</sup> Multi-core Performance: I just multiplied by (p-)core count, since the Pentium values also are simply multiplied and added.

<sup id="i914900KS">7</sup> According to [this benchmark comparison](https://cpu.userbenchmark.com/Compare/Intel-Core-i9-14900KS-vs-Intel-Core-i7-3930K/m2295306vs1487), the single-core performance of the i9-14900KS is 166% of that of the i7-3930K. The "processor base power" is 150W [according to Intel](https://www.intel.de/content/www/de/de/products/sku/237504/intel-core-i9-processor-14900ks-36m-cache-up-to-6-20-ghz/specifications.html). I assume 60W for a single-core benchmark and 253W for fully boosted multi-core.

<sup id="transistorcount">8</sup> [P75](https://www.cpu-world.com/CPUs/Pentium/Intel-Pentium%2075%20-%20A80502-75.html#:~:text=2524%0A2525%0A2526-,Manufacturing%20process,-0.6%20micron%0A3.2),
[P90](https://www.cpu-world.com/CPUs/Pentium/Intel-Pentium%2090%20-%20A80502-90.html#:~:text=2524%0A2525%0A2526-,Manufacturing%20process,-0.6%20micron%0A3.2), see same site for P100, P133, P166. [3930K](https://www.techpowerup.com/cpu-specs/core-i7-3930k.c858#:~:text=32%20nm-,Transistors,-%3A). Actual i9-14900KS transistor count is unknown.

<Comment/>
