## Description of visualization 02

* Is there a regional effect in the data? 
* Are some names more popular in some regions? 
* Are popular names generally popular across the whole country?

For this visualization we chose a geospacial map to better present the eventual regional effects. We can use two linked views with two different color encodings. In the first view we can use color to only encode categorical data (one color for each top name of a given departement). This will allow us to quickly identify whether the same name is most populare in all departments (regional effects), since if there are two departements with the same color it means that they share the same top popular name. We can then use a second view in which the color of each departement is used to encode a name's distribution (with a color scale). This will be particularly clear to readers because position on the map and color are easilly sperable and color scales are useful to show quantitative data. The user will be able to have a sens of order at a quick glance. To show the actual values, we can use tolltips. In order to choose a name for which we show the distribution we can use a filter that links the two views. This two views design implements Shneiderman's mantra: overview first (the first overview map), zoom and filter (with filters on names and years), details on demand (tooltips). To have a sense of evolution over time, we can add a filter for a range of years on which to aggregate the data. The user can then select different range to see the evolution over time.

In the dashboard, the worksheet on the left shows the most popular name of each department during the chosen period, which is configurable by the "Year" filter on top of it, as shown below. \
![Alt text](Visualization2_1.JPG?raw=true "Visualization 2 view 1")

Once we click on a certain department it creates a selection to show the birth distribution over the whole country of the corresponding name is shown in the worksheet on the right, as shown below.
![Alt text](Visualization2_2.JPG?raw=true "Visualization 2 view 2")

As we can see in the chart, different departments have different top names, which implies regional effect. Some names are more popular in some regions, but not across the whole country.

One limitation of this visualization is that the evolution over time can only be seen using filters, which requires users' action. It would have been better to use animations or small mutliples to better show the evoluation. For example if a departement has the same top name several years in a row it won't be very easy to identify it with our current implementation.

