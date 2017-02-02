Data Story

I looked at the flight arrival statistics for several airports in the US and I sampled the airports such that different geography and climate are well represented in the sample.
Considering this dataset includes delay statistics, I wanted to investigate if the proportion of delayed flights have systematically gone up or down over the years. My hypothesis was it would have a downward trend considering improvements in air traffic control and other things. 
In addition, I thought that weather must be the most important contributing factor for flight delays and therefore I investigated the presence of seasonal effects by plotting the monthly data for each year in the dataset.

Design

I started by creating an animation wherein we cycle through the years and plot flight delay and flight volume next to each other. The objective here was to compare the proportion of delayed flights between the years and see if it has any noticeable trend when viewed next to the average number of flight arrivals.
Next, I introduced the dropdown so that any specific year in the dataset can be selected. This would help us focus on any particular year as details might get overlooked when viewing the entire animation.
In order to view seasonal effects as well as address comments about viewing the delay for each of the attributable causes, I introduced the stacked bar chart which included the proportion of delayed flights and the amount of delay for a given month. I introduced a selectbox wherein the user may select any particular month to view the aforementioned artifacts for that period. It should be noted that the dropdown selection is filtered based on the year selection in the top-half of the window.

Reviewer Feedback

Feedback from Julianna B.: 
The first thing I noticed was that the flight delay has stayed fairly consistent for the period between 2003 and 2012 and has started coming down slightly from 2013 onwards. I noticed that the number of flights has been also steadily decreasing from 2007 onwards, this could have resulted in the decrease in the delay in recent years. 
Instead of showing the annual flight volume, consider normalizing the data for each month. That way the numbers will not be affected by the months of data available in the dataset. Secondly, instead of showing the numbers in an absolute scale, consider using a truncated y-axis so that the variation in the data can be seen more easily.

Response: I addressed both. I plotted the number of average monthly flights and truncated the axis such that the differences between the years are clearly visible.

Feedback from Matt H.: 
I liked the animation, although it was slightly too quick to make any mental notes. I was expecting the number of flights to increase with time which is not the case for the airports included in the charts. This was counter-intuitive. The proportion of delayed flights was more or less constant which I thought would shrink over time due to improvements in technology.
Please consider using a scale where the differences in the delay percentages are more visible. Consider stemming the lower limit of y-axis to the minimum delay value seen in the entire dataset. Secondly, a pie chart showing the proportion of the delay by category might also help as it will give a visual representation of the total delay for each of the delay categories.

Response: I ignored the first as in the class it was told that it is typically not recommended to alter the scale in a way that gives the wrong impression of the data. Snapping the minimum delay (~16%) to 0 would have resulted in a visual illusion that would make the highest delay (~38%) look 10 times more instead of twice the size. As for the second comment, I added a stacked bar chart to include the proportion of the delay by category for each month in the dataset. In the class, the instructor said that the human eye fails to judge the data values when expressed in angles (pie-chart) versus length (bar chart).

Feedback from Johan T.: 
I liked the animation. It looks like the number of flights have come down over the years and the number of delayed flights has also shrunk slightly. Maybe the decrease in traffic has helped the reduction in the number of delayed flights. One interesting observation was that while weather gets so much coverage in media for flight delays, this dataset suggests differently. It looks like the aviation system delay is the most dominant factor for the number of delayed flights in US. I was hoping that I would notice some seasonal trends, like higher delays in December but it didn’t appear that way.
Consider using a color palette for the stacked bar charts that is different from red-green as many people have difficulties distinguishing different shades of red and green. Secondly, update the dropdown option's text to something that shows which month's data is unavailable for the dataset being studied. Lastly, add the year to the month in the banner "Detailed statistics for ...".

Response: I changed the color palette to "blue" from "red-green". I updated the dropdown option's text to "No data available for ..." for months of a specific year whose data was not available in the dataset. Lastly, I updated the banner text to "Detailed statistics for  January, 2016" which includes the year.

References

1. https://en.wikipedia.org/wiki/List_of_the_busiest_airports_in_the_United_States Accessed on 1/14/2017.
2. https://bl.ocks.org/mbostock/5577023 Accessed on 01/25/2017.
3. https://github.com/d3/d3-3.x-api-reference/blob/master/Stack-Layout.md Accessed on 01/21/2017.
4. https://bost.ocks.org/mike/constancy/ Accessed on 01/16/2017.
5. https://www.rita.dot.gov/bts/help/aviation/html/understanding.html#q6 Accessed on 01/15/2016
