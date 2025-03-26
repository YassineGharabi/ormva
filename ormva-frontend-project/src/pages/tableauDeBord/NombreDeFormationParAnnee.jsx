import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton";



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
}

const NombreDeFormationParAnnee = ({ nombreParAnnee, loading }) => {

  const chartData = [
    { annee: 2021, Nombre: nombreParAnnee.annee1 },
    { annee: 2022, Nombre: nombreParAnnee.annee2 },
    { annee: 2023, Nombre: nombreParAnnee.annee3 },
    { annee: 2024, Nombre: nombreParAnnee.annee4 },
    { annee: 2025, Nombre: nombreParAnnee.annee5 },
  ];


  return (
    <div className='relative'  >
      {
        loading ?
          <Skeleton className='w-full h-[360px]' /> :
          <>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="annee"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="Nombre"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ChartContainer>
            <span className="text-black/85 dark:text-white font-semibold text-center absolute top-5 left-28" >Total des formations par année</span>
          </>
      }
    </div>
  )
}

export default NombreDeFormationParAnnee;
