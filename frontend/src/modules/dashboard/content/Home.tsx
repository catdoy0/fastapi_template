
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Lorem ipsum</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Home</h1>
      </div>
      <section className="lg:px-25 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <h2 className="font-semibold">Lorem Ipsum</h2>
        <p className="mt-2 text-justify text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam urna ante,
          efficitur sed sapien a, gravida dapibus ipsum. Nam ut massa sagittis, finibus leo eget,
          lacinia justo. Cras scelerisque nisl id nibh egestas pharetra. Proin felis lacus, semper eget
          libero id, iaculis hendrerit metus. Pellentesque sed aliquet felis. Donec in ligula sed nibh molestie
          consectetur. Maecenas viverra aliquet sapien et fermentum. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas. 
        </p>
      </section>
    </div>
  );
}
