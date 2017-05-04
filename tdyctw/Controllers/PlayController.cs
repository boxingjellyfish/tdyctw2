using csDelaunay;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace tdyctw.Controllers
{
    public class PlayController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GenerateFixedMap()
        {
            var points = new List<Vector2f>();
            /*
            points.Add(new Vector2f(100, 100));
            points.Add(new Vector2f(200, 300));
            points.Add(new Vector2f(40, 60));
            points.Add(new Vector2f(50, 150));
            points.Add(new Vector2f(256, 123));
            points.Add(new Vector2f(545, 411));
            */
            var r = new Random();

            while (points.Count < 200)
            {
                var p = new Vector2f(r.Next(10, 900), r.Next(10, 500));
                if (!points.Contains(p))
                    points.Add(p);
            }

            var bounds = new Rectf(10, 10, 950, 530);

            var voronoi = new Voronoi(points, bounds);
            voronoi.LloydRelaxation(2);

            var result = new GenerateFixedMapResult();

            result.Diagram = voronoi.VoronoiDiagram();
            result.HullPoints = voronoi.HullPointsInOrder();

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }

    public class GenerateFixedMapResult
    {
        public List<LineSegment> Diagram { get; set; }
        public List<Vector2f> HullPoints { get; set; }
    }
}