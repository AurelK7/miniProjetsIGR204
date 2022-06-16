# Description of visualization 01
## Introduction
This visualization intends to answer to following questions:
* How do baby names evolve over time? 
* Are there names that have consistently remained popular or unpopular? 
* Are there some that have were suddenly or briefly popular or unpopular? 
* Are there trends in time?

Our proposal is to show evolution of percentage (not strictly percentage but the ration
annual birth of each name in all region divide by total annual birth of
year) of annual births for each name during time.
and additional barplot of annual births per name
The advantage of percentage is to scale values during time, so we could have
better comparison of births during time.

The lineplot on the main chart will help to answer to above questions by
showing pop-up any "outlier"...... 

We also propose two variants of the plot by adding new chart showing the 
evolution of gobal annual births and names diversity during time.

## First proposal
The first proposal consists in two charts. It is an interactive chart which
let user to select the display. At the beginning, only `selectors` are available and
waiting for user action. \
The user must select (`Display` and `Year`) or (`Name`) where `name` has the highest
priority.
* **Display:** filter number of names to display. if None, all name will be selected. It needs `Year` selected also
* **Year:** filter year to display:
* **Name:** filter name to display. 

Here are some use cases:
* This picture show the result of selecting all year in `Year` filter.
lineplot draw percentage of annual births per name per year during 1920.
And the histogram represents same but using annual births instead of percentage.
**`ON REMARQUE UNE FAIBLE VARIANCE/ECART-TYPE DE LA POPULARITE DES PRENOMS AVEC LE TEMPS
. QUELQUES PRENOMS QUI SORTENT DU LOTS MAIS RESTE MOINS LONGTEMPS POPULAIREE`** 

![alt-text-1](images/All_year.png "Year")


* Displaying the evolution of top 10 of popular names in 1994. The top 10 is done by
ranking the percentage of names for selected year without taking gender impact. 
![alt-text](images/top10_1994.png "1994_top10")


* on this case, we show the priority of `Name` selector over the two one. So the 
visualization draw the evolution of name `James` over the time. Values of `Display` and `Year`
are not taked in account.
![alt-text-2](images/Name_prior_others.png "Name")


* User can select a specific name on the lineplot to pop-up the curve on both
plot. 

![alt-text-2](images/selection_filter.png "filter")

## Second proposal
The second proposal is to add some information we found interesting.
Lineplot shows that popularity of name decrease from year to year, so we tried to
to understand if the number of births was decreasing also. To answer to this question
we propose to add the evolution of annual births and diversity of names. 
![alt-text-2](images/2nd_option_bottom5_1901.png "2nd_option")