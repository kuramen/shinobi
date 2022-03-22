<template lang="pug">
.section.roadmap
    .header
        h1.title Roadmap
    .content
        svg.timeline(:viewBox="`0 0 ${isMobile ? 363 : 726} ${roadmap.length * 200}`" xmlns="http://www.w3.org/2000/svg")
            path.dash-line(
                :d="`M 365.5,7 V ${(roadmap.length - 1) * 200}`"
                :transform="`translate(${isMobile ? -335 : 0} 0)`"
            )
            g(
                v-for="(point, index) in roadmap"
                :class="{ previous: index < activePoint, active: index === activePoint, left: (index % 2) && !isMobile }"
                :transform="`translate(${isMobile ? 90 : 425} ${18 + index * 195})`"
            )
                path.dot(d="M -47,-4.5 A 12.5,12.5 0 0 1 -59.5,8 12.5,12.5 0 0 1 -72,-4.5 12.5,12.5 0 0 1 -59.5,-17 12.5,12.5 0 0 1 -47,-4.5 Z")
                path.little-dot(d="m -56.4656,-4.4828 a 3.0172,3.0172 0 0 1 -3.0172,3.0172 3.0172,3.0172 0 0 1 -3.0172,-3.0172 3.0172,3.0172 0 0 1 3.0172,-3.0172 3.0172,3.0172 0 0 1 3.0172,3.0172 z")
                path.line(v-if="index !== roadmap.length-1 && index < activePoint" d="M -59.5,-10 V 180")
                text.percentage {{`${point.percentage}%`}}
                text.title(y="30") {{point.title}}
                path.check(v-if="index <= activePoint" d="m 197,32.999998 c -5.52,-0.006 -9.994,-4.4796 -10,-10 v -0.2 c 0.11,-5.4955 4.635,-9.872 10.131,-9.7991 5.496,0.0729 9.903,4.568 9.867,10.064 -0.036,5.4964 -4.501,9.9335 -9.998,9.9346 z m -4.59,-10.41 -1.41,1.41 4,4 8,-8 -1.41,-1.42 -6.59,6.59 z")
                foreignObject(y="48" :width="isMobile ? 250 : 300" height="100")
                    p.description(xmlns="http://www.w3.org/1999/xhtml") {{point.description}}
        img.timeline-background()
</template>

<script>

import Mobile from "@/mixins/Mobile"

export default {
  name: "Roadmap",
  mixins: [ Mobile ],
  data() {
      return {
          roadmap: [
              { percentage: 10, title: 'First Blood',  description: 'Special giveaway for all vampires within the first week.'},
              { percentage: 25, title: 'Night fall',  description: 'All all vampires will get special companion; the Syndicate releases bats.'},
              { percentage: 50, title: 'Twilight',  description: 'It gets cold without sunlight. Merch release.'},
              { percentage: 75, title: 'Eclipse',  description: 'Introduction of the Vampire Lair. Metaver land purchased, ready to kick back.'},
              { percentage: 100, title: 'Vamps Live',  description: 'Generation 2 Teaser.'}
          ],
          activePoint: 2
      }
  }
}
</script>

<style lang="scss">
    .content svg.timeline{
        font-family: "Roboto", sans-serif;
        
        .dash-line {
            stroke: $secondary-color;
            stroke-width: 3;
            stroke-dasharray: 15, 15;
            stroke-dashoffset: 40; 
        }

        g {
            foreignObject p.description {
                color: $secondary-color;
                font-size: 19px;
                text-align: left;
            }
            .percentage {
                font-size: 20px;
            }

            .title {
                font-size: 26px;
                fill: $tertiary-color;
                transform: translateX(0px);
            }

            .check {
                fill: $primary-color;
                transform: translateX(-185px);
            }


            .percentage,
            .dot {
                fill: $secondary-color;
            }

            .little-dot {
                display: none;
            }

            .line {
                stroke: $primary-color;
                stroke-width: 3;
            }
            

            &.left {
                foreignObject {
                    transform: translateX(-420px);
                    p.description {
                        text-align: right;
                    }
                }

                .title,
                .percentage {
                    text-anchor: end;
                    transform: translateX(-123px)
                }

                .check {
                    transform: translateX(-325px);
                }
            }

            &.active {
                .percentage {
                    fill: $primary-color;
                }

                .dot {
                    stroke: $primary-color;
                    stroke-width: 1;
                }

                .little-dot {
                    fill: $primary-color;
                    display: block;
                }

                .title {
                    transform: translateX(35px)
                }
                
                &.left .title {
                    transform: translateX(-155px)
                }

            }

            &.previous {
                .percentage {
                    fill: $primary-color;
                }

                .dot {
                    fill: $primary-color
                }

                .title {
                    text-decoration: line-through;
                    transform: translateX(35px)
                }
                

                &.left .title {
                    transform: translateX(-155px)
                }
            }
        }
    }
    
</style>