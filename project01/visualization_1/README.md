# Description of visualization 01
## Introduction
This visualization intends to answer to following questions:
* How do baby names evolve over time? 
* Are there names that have consistently remained popular or unpopular? 
* Are there some that have were suddenly or briefly popular or unpopular? 
* Are there trends in time?

Our idea is to show the evolution of the percentage of annual births for each name during time. To be more specific, this is not strictly a percentage but rather the ratio of annual births of each name in all regions divided by total annual births during the year.
We also added an additional barplot of annual births per name.
The advantage of this percentage is to scale values during time, so we could have
better comparison of popularity of names over time.

The lineplot on the main chart will help to answer to above questions by putting in evidence any "outlier".

We also propose two variants of the plot by adding a new chart showing the evolution of global annual births and names diversity over time.

## First proposal
The first proposal consists in a combination of two interactive charts which lets the user to select the data they want to display. At the beginning, only `selectors` are shown. The user needs to use the selector to display the visualization. \
The user must select (`Display` and `Year`) or (`Name`) where `Name` has the highest priority.
* **Display:** filters the number of names to display. If None is selected, all names will be shown. It also needs `Year` to be selected.
* **Year:** filters the year to display.
* **Name:** filters the name to display. 

Here are some use cases:
* This picture shows the result of selecting all years in the `Year` filter.
The lineplot shows the percentage of annual births per name per year from year 1900 to year 2020. The histogram represents the same data but using annual births instead of percentage.
![alt-text-1](images/All_year.png "Year")
Thanks to this visualization we can see that there are no names that seem to consistently remain popular.

* Below we are displaying the evolution of top 10 popular names of 1994. The top 10 is done by ranking the percentage of names for the selected year without taking gender into account. 
![alt-text](images/top10_1994.png "1994_top10")
By selecting the Bottom 5 for All year, we can observe that some names consistently remain unpopular. By selecting the Top 5 of a given year (e.g. 2002) we can see that some names that became briefly popular. On the contrary, by selecting some other year (e.g. 2020) we can observe that some names have been temporarily unpopular.

* In this case, we show the priority of `Name` selector over the two one. So the visualization draws the evolution of name `James` over the time. Values of `Display` and `Year` are not taken into account.
![alt-text-2](images/Name_prior_others.png "Name")


* User can select a specific name on the lineplot to highlight the curve on both plot.
![alt-text-2](images/selection_filter.png "filter")

## Second proposal
The second proposal is to add some information we found interesting. The lineplot shows that popularity of every name decreases from year to year. To try to understand what is happening we added the evolution of annual births and diversity of names. Thanks to this additional graph we can observe that this is due to the fact that the names attributed are more and more diverse.
![alt-text-2](images/2nd_option_bottom5_1901.png "2nd_option")
